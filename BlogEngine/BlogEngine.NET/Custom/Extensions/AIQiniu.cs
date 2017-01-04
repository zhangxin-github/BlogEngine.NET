/****************************** 模块头 ******************************\
 * 
 * 模块名称:  AIQiniu.cs
 * 创建时间:  2015/2/24
 * 版权：Copyright (c) (http://zhangx.net) Corporation.
 * 
 * 
 * 实现七牛云镜像。
 * 
 * 
 * This source is subject to the Microsoft Public License.
 * See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL.
 * All other rights reserved.
 * 
 * THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, 
 * EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED 
 * WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
\***************************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.Text.RegularExpressions;
using System.IO;
using System.Drawing.Drawing2D;
using System.Net;

using BlogEngine.Core.Web.Controls;
using BlogEngine.Core;
using System.Collections;
using BlogEngine.Core.Web.Extensions;

/// <summary>
/// 插件名称、版本、作者、优先级。
/// </summary>
/// 
[Extension("七牛云镜像", "1.0", "<a href=\"http://www.zhangx.net\">zhangx.net</a>", 20)]
public class AIQiniu
{
    private static string localHost=""; // 博客域名
    private static string qiniuHost=""; // 七牛域名
    private static string cdnExts=""; // 扩展名（使用|分隔）
	//private static string CDN_DIRS   = "wp-content|wp-includes"; // 目录（使用|分隔）

    private const string extensionName = "AIQiniu";
    private static readonly object syncRoot = new object();
    private static Dictionary<Guid, ExtensionSettings> blogsSettings = new Dictionary<Guid, ExtensionSettings>();


    public AIQiniu()
    {
        InitSettings();
        Post.Serving += new EventHandler<ServingEventArgs>(Post_Serving);
    }

    #region Settings
    private static void InitSettings()
    {
        // call Settings getter so default settings are loaded on application start.
        var s = Settings;
    }

    private static ExtensionSettings Settings
    {
        get
        {
            Guid blogId = Blog.CurrentInstance.Id;
            if (!blogsSettings.ContainsKey(blogId))
            {
                lock (syncRoot)
                {
                    if (!blogsSettings.ContainsKey(blogId))
                    {
                        blogsSettings[blogId] = LoadExtensionSettingsForBlogInstance();
                    }
                }
            }

            return blogsSettings[blogId];
        }
    }

    private static ExtensionSettings LoadExtensionSettingsForBlogInstance()
    {
        ExtensionSettings initialSettings = new ExtensionSettings(extensionName);
        #region Help
//        initialSettings.Help = @"
//        <p>Build on <a href=""http://mediaelement.js.com/"">MediaElement.js</a>, the HTML5 video/audio player.</p>
//
//        <ol>
//	        <li>Upload media files to your /media/ folder</li>
//	        <li>Add short code to your media: [video src=""myfile.mp4""] for video and [audio src=""myfile.mp3""] for audio</li>
//	        <li>Customize with the following parameters:
//		        <ul>
//			        <li><b>width</b>: The exact width of the video</li>
//			        <li><b>height</b>: The exact height of the video</li>
//			        <li><b>autoplay</b>: Plays the video as soon as the webpage loads</li>
//		        </ul>
//	        </li>
//	        <li>You can also specify multiple file formats and codecs 
//		        <ul>
//			        <li><b>mp4</b>: H.264 encoded MP4 file</li>
//			        <li><b>webm</b>: VP8/WebM encoded file</li>
//			        <li><b>ogg</b>: Theora/Vorbis encoded file</li>
//		        </ul>
//	        </li>
//        </ol>
//
//        <p>A complete example:<br />
//        [code mp4=""myfile.mp4"" webm=""myfile.webm"" ogg=""myfile.ogg"" width=""480"" height=""360""]
//        </p>
//
//        <p>Supported formats</p>
//        <ul>
//	        <li><b>MP4/MP3</b>: Native HTML5 for IE9, Safari, Chrome; Flash in IE8, Firefox, Opera</li>
//	        <li><b>WebM</b>: HTML5 for IE9, Chrome, Firefox, Opera; Flash in IE8 (coming in Flash 11)</li>
//	        <li><b>FLV</b>: Flash fallback</li>
//	        <li><b>WMV/WMA</b>: Silverlight fallback</li>
//        </ul>
//        ";
        #endregion
        initialSettings.IsScalar = true;


        initialSettings.AddParameter("local_host", "博客域名");
        initialSettings.AddValue("local_host", localHost);

        initialSettings.AddParameter("qiniu_host", "七牛绑定域名");
        initialSettings.AddValue("qiniu_host", qiniuHost);

        initialSettings.AddParameter("cdn_exts", "扩展名（使用|分隔");
        initialSettings.AddValue("cdn_exts", cdnExts);

        return ExtensionManager.InitSettings(extensionName, initialSettings);
    }
    #endregion

    /// <summary>
    /// 调用文章时触发。
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    void Post_Serving(object sender, ServingEventArgs e)
    {
        if (!string.IsNullOrEmpty(e.Body))
        {
            if (e.Location == ServingLocation.PostList || e.Location == ServingLocation.SinglePost)
            {

                GetHrefUrl(e);
                GetSrcUrl(e);
            }
        }
    }

    /// <summary>
    /// 取得HTML中所有的href
    /// </summary>
    /// <returns></returns>
    private static string[] GetHrefUrl(ServingEventArgs e)
    {
        string href = string.Format("href=(?:\"|\')?(?<url>[^>]*[^/].(?:{0}))(?:\"|\')?", Settings.GetSingleValue("cdn_exts"));
        Regex r = new Regex(href, RegexOptions.IgnoreCase | RegexOptions.Compiled);
        MatchCollection matches = r.Matches(e.Body);

        int i = 0;
        string[] sUrlList = new string[matches.Count];

        // 取得匹配项列表
        foreach (Match match in matches)
        {
            string m = match.Groups["url"].Value;
            sUrlList[i++] = m;
            e.Body = e.Body.Replace(m, (Settings.GetSingleValue("qiniu_host") + m).Replace("?", HttpUtility.UrlEncode("?")));
        }
        return sUrlList;
    }

    /// <summary>
    /// 取得HTML中所有的src
    /// </summary>
    /// <returns></returns>
    private static string[] GetSrcUrl(ServingEventArgs e)
    {
        string src = string.Format("src=(?:\"|\')?(?<url>[^>]*[^/].(?:{0}))(?:\"|\')?", Settings.GetSingleValue("cdn_exts"));
        Regex r = new Regex(src, RegexOptions.IgnoreCase | RegexOptions.Compiled);
        MatchCollection matches = r.Matches(e.Body);

        int i = 0;
        string[] sUrlList = new string[matches.Count];

        // 取得匹配项列表
        foreach (Match match in matches)
        {
            string m = match.Groups["url"].Value;
            sUrlList[i++] = m;
            e.Body = e.Body.Replace(m, (Settings.GetSingleValue("qiniu_host") + m).Replace("?", HttpUtility.UrlEncode("?")));
        }
        return sUrlList;
    } 
}
