﻿<%@ Control Language="C#" AutoEventWireup="true" EnableViewState="false" Inherits="BlogEngine.Core.Web.Controls.PostViewBase" %>
<%@ Import Namespace="BlogEngine.Core" %>

<article class="post" id="post<%=Index %>">
    <header class="post-header">
        <h2 class="post-title">
            <a href="<%=Post.RelativeOrAbsoluteLink %>"><%=Server.HtmlEncode(Post.Title) %></a>
        </h2>
        <div class="post-info clearfix">
            <span class="post-date"><%=Post.DateCreated.ToString("dd MMMM yyyy") %></span>
            <span class="post-author"><a href="<%=Utils.AbsoluteWebRoot + "author/" + Utils.RemoveIllegalCharacters(Post.Author + BlogConfig.FileExtension) %>"><%=Post.AuthorProfile != null ? Utils.RemoveIllegalCharacters(Post.AuthorProfile.DisplayName) : Utils.RemoveIllegalCharacters(Post.Author) %></a></span>
            <span class="post-category"><%=CategoryLinks(", ") %></span>
            <!-- 多说分享 start -->
            <%--<div class="ds-share" data-thread-key="<%=Post.Id %>" data-title="<%=Post.Title %>" data-images="" data-content="<%=Post.Title %>" data-url="<%=Post.AbsoluteLink %>">
                <div class="ds-share-inline">
                    <ul class="ds-share-icons-16">

                        <li data-toggle="ds-share-icons-more"><a class="ds-more" href="javascript:void(0);">分享到：</a></li>
                        <li><a class="ds-weibo" href="javascript:void(0);" data-service="weibo">微博</a></li>
                        <li><a class="ds-qzone" href="javascript:void(0);" data-service="qzone">QQ空间</a></li>
                        <li><a class="ds-qqt" href="javascript:void(0);" data-service="qqt">腾讯微博</a></li>
                        <li><a class="ds-wechat" href="javascript:void(0);" data-service="wechat">微信</a></li>

                    </ul>
                    <div class="ds-share-icons-more">
                    </div>
                </div>
            </div>--%>
            <!-- 多说分享 end -->
        </div>
    </header>
    <section class="post-body text">
        <asp:PlaceHolder ID="BodyContent" runat="server" />
    </section>
    <% if (Location == ServingLocation.SinglePost)
        {%>
    <!-- iShare BEGIN -->
    <div id="iShare" class="iShare iShareP2 fr">
        <span class="Qs_txt">分享到：</span>
        <a class="Qs_weibo" title="腾讯微博"></a>
        <a class="Qs_qzone" title="QQ空间"></a>
        <a class="Qs_sina" title="新浪微博"></a>
        <a class="Qs_pengyou" title="朋友网"></a>
        <a class="Qs_qmail" title="QQ邮箱"></a>
        <a class="Qs_kaixin" title="开心网"></a>
        <a class="Qs_renren" title="人人网"></a>
    </div>
    <script type="text/javascript" src="<%=Utils.RelativeWebRoot %>custom/themes/standard/src/js/ishare.js"></script>
    <script type="text/javascript">(function () { shareQQ({ WB: false }); })();</script>
    <!-- iShare END -->
    <footer class="post-footer">        
        <div class="post-tags">
            <%=Resources.labels.tags %> : <%=TagLinks(", ") %>
        </div>
        <div class="post-rating">
            <%=Rating %>
        </div>
        <div class="post-adminlinks"><%=AdminLinks %></div>
    </footer>
    <%} %>
</article>
