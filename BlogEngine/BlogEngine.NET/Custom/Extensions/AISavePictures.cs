/****************************** 模块头 ******************************\
 * 
 * 模块名称:  AISavePictures.cs
 * 创建时间:  2015/2/20
 * 版权：Copyright (c) (http://zhangx.net) Corporation.
 * 
 * 
 * 实现添加到文章中的本地图片或网络图片自动保存到服务器。
 * 并且可根据设置大小进行缩略。 
 * 注意，一些服务器有区分路径大小写， 因此解析路径地址时勿转换大小写。
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

/// <summary>
/// 插件名称、版本。
/// </summary>
/// 
[Extension("保存图片", "1.0", "<a href=\"http://www.zhangx.net\">zhangx.net</a>")]
public class AISavePictures
{
    // 图片保存路径
    private static string FOLDER = System.Web.HttpContext.Current.Server.MapPath(BlogConfig.DefaultStorageLocation + "/files/");
    // 提取出所有图像标签
    // Matches：<img src="gif.gif" ></img>|<img id="blah" src="gif"></img>|
    //          <img src="gif.gif" id="freaky">|</img>|<img src="gif.gif" />|
    //          <img src="gif.gif"/>|<img class="FloatLeft Margin" id="calendarButton81" src="calendar.gif" alt="Calendar Button" />
    private static string IMAGE_TAG_REGEX = 
        "<[iI][mM][gG][a-zA-Z0-9\\s=\".]*((src)=\\s*(?:\"([^\"]*)\"|'[^']*'))[a-zA-Z0-9\\s=\".]*/*>(?:</[iI][mM][gG]>)*";
    //提取出图像src属性
    // Matches: src="http://www.thoughtlava.com/images/logo.gif"
    private static string IMAGE_SRC_REGEX = "src=(?:\"|\')?(?<imgSrc>[^>]*[^/].(?:jpg|bmp|gif|png))(?:\"|\')?";
    private static int Width = 700;
    private static int Height = 500;

    public AISavePictures()
    {
        Post.Serving += new EventHandler<ServingEventArgs>(Post_Serving);
    }

    void Post_Serving(object sender, ServingEventArgs e)
    {
        if (!string.IsNullOrEmpty(e.Body))
        {
            if (e.Location == ServingLocation.PostList || e.Location == ServingLocation.SinglePost)
            {
                
                MatchCollection matches = Regex.Matches(e.Body, IMAGE_TAG_REGEX);

                if (matches.Count > 0)
                {
                    string filePath = string.Empty;
                    string newFilePath = string.Empty;
                    string imageTag = string.Empty;
                    string url = string.Empty;
                    FileInfo fi = null;// 需操作的图片文件

                    foreach (Match match in matches)
                    {
                        Regex r = new Regex(IMAGE_SRC_REGEX, RegexOptions.Compiled);
                        Match m = r.Match(match.Value);
                        if (m.Success)
                        {
                            if (m.Value.Contains("http://"))
                            {
                                // 网络图片保存到本地
                                using (WebClient client = new WebClient())
                                {
                                    Post post = (Post)sender;
                                    url = m.Value.Replace("src=", string.Empty).Replace("\"", string.Empty).Trim();
                                    filePath = post.DateCreated.ToString("yyyy") + "/" + post.DateCreated.ToString("MM") + "/" +
                                               url.Substring(url.LastIndexOf("/") + 1);
                                    fi = new FileInfo(FOLDER + filePath);

                                    if (!fi.Exists)
                                    {
                                        if (!Directory.Exists(Path.GetDirectoryName(fi.FullName)))
                                            Directory.CreateDirectory(Path.GetDirectoryName(fi.FullName));
                                        client.DownloadFile(url, fi.FullName);
                                    }
                                }
                            }
                            else
                            {
                                // 本地图片
                                filePath = m.Value.Replace("src=\"/image.axd?picture=", string.Empty).Replace("\"", string.Empty).Trim();
                                fi = new FileInfo(FOLDER + filePath);
                            }

                            // 是否生成缩略图
                            if (fi.Exists)
                            {
                                //Bitmap originalBmp = new Bitmap(fi.FullName);

                                //if (originalBmp.Width < Width && originalBmp.Height < Height)
                                //{
                                //    return;
                                //}
                                //else
                                //{
                                //    newFilePath = filePath.Replace(Path.GetFileName(fi.FullName),
                                //                      Path.GetFileNameWithoutExtension(fi.FullName) + "-Thumbnail" + Path.GetExtension(fi.FullName));
                                //    FileInfo newFi = new FileInfo(FOLDER + newFilePath);
                                //    if (!newFi.Exists)
                                //    {
                                //        Bitmap imgTag = CreateThumbnail(originalBmp, Width, Height);

                                //        //Configure JPEG Compression Engine
                                //        System.Drawing.Imaging.EncoderParameters encoderParams = new System.Drawing.Imaging.EncoderParameters();
                                //        long[] quality = new long[1];
                                //        quality[0] = 75;//设定压缩的级别

                                //        System.Drawing.Imaging.EncoderParameter encoderParam = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);
                                //        encoderParams.Param[0] = encoderParam;

                                //        System.Drawing.Imaging.ImageCodecInfo[] arrayICI = System.Drawing.Imaging.ImageCodecInfo.GetImageEncoders();
                                //        System.Drawing.Imaging.ImageCodecInfo jpegICI = null;
                                //        for (int x = 0; x < arrayICI.Length; x++)
                                //        {
                                //            if (arrayICI[x].FormatDescription.Equals("JPEG"))
                                //            {
                                //                jpegICI = arrayICI[x];
                                //                break;
                                //            }
                                //        }

                                //        if (jpegICI != null)
                                //        {
                                //            imgTag.Save(newFi.FullName, jpegICI, encoderParams);
                                //        }
                                //        else
                                //        {
                                //            imgTag.Save(newFi.FullName);
                                //        }
                                //        imgTag.Dispose();
                                //    }
                                //}
                                //originalBmp.Dispose();

                                imageTag = string.Format("<img alt=\"\" src=\"/image.axd?picture={0}\" />", filePath);
                                e.Body = e.Body.Replace(match.Value, imageTag);
                            }
                        }
                    }
                }
            }
        }
    }

    /// <summary>
    /// 创建一个现有图像的缩略图。设置缩略图的最大尺寸高度和尺度等方面，以保持纵横比。
    /// </summary>
    /// <param name="imageStream">为创建缩略图的流</param>
    /// <param name="desiredWidth">理想的宽度</param>
    /// <param name="desiredHeight">理想的高度</param>
    /// <returns>缩略图位图</returns>
    public Bitmap CreateThumbnail(Bitmap originalBmp, int desiredWidth, int desiredHeight)
    {
        int newWidth, newHeight;

        if (desiredWidth * originalBmp.Height < desiredHeight * originalBmp.Width)
        {
            newWidth = desiredWidth;
            newHeight = (int)Math.Round((decimal)originalBmp.Height * desiredWidth / originalBmp.Width);
        }
        else
        {
            newHeight = desiredHeight;
            newWidth = (int)Math.Round((decimal)originalBmp.Width * desiredHeight / originalBmp.Height);
        }

        Bitmap bmpOut = new Bitmap(newWidth, newHeight);
        using (Graphics graphics = Graphics.FromImage(bmpOut))
        {
            // 设置高质量插值法 
            //graphics.InterpolationMode = InterpolationMode.High;
            // 设置高质量,低速度呈现平滑程度 
            //graphics.SmoothingMode = SmoothingMode.HighQuality;
            // 清空画布并以透明背景色填充
            //graphics.Clear(System.Drawing.Color.Transparent);

            graphics.FillRectangle(Brushes.White, 0, 0, newWidth, newHeight);
            graphics.DrawImage(originalBmp, 0, 0, newWidth, newHeight);
        }

        return bmpOut;
    }
}
