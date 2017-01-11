<%@ Control Language="C#" AutoEventWireup="true" Inherits="UserControls.CommentList" Codebehind="CommentList.ascx.cs" %>
<%@ Import Namespace="BlogEngine.Core" %>

<div class="well-global">
    <% if (CommentCounter > 0){ %>
    <h3 id="comment" class="well-global-title">
        <%=Resources.labels.comments %> (<%=CommentCounter%>)
        <a id="commenttoggle" style="float: right; width: 20px; height: 20px; border: 1px solid #ccc; text-decoration: none; text-align: center" href="javascript:toggle_visibility('commentlist', 'commenttoggle');">-</a>
    </h3>
    <%} %>

    <div id="commentlist" style="display: block">
      <asp:PlaceHolder runat="server" ID="phComments" />      
    </div>
</div>

<asp:PlaceHolder runat="server" ID="phTrckbacks"></asp:PlaceHolder>

<asp:PlaceHolder runat="Server" ID="phAddComment">
    <div id="comment-form">
        <img src="<%=Utils.RelativeWebRoot %>Content/images/blog/ajax-loader.gif" width="24" height="24" alt="Saving the comment" style="display: none" id="ajaxLoader" />
        <span id="status"></span>
        <asp:PlaceHolder runat="server" ID="phCommentForm"></asp:PlaceHolder>
        <% if (NestingSupported){ %>
        <asp:HiddenField runat="Server" ID="hiddenReplyTo" />
        <p id="cancelReply" style="display: none;">
            <a href="javascript:void(0);" onclick="BlogEngine.cancelReply();"><%=Resources.labels.cancelReply %></a>
        </p>
        <%} %>
        <blog:SimpleCaptchaControl ID="simplecaptcha" runat="server" />
        <blog:RecaptchaControl ID="recaptcha" runat="server" />
        <asp:HiddenField runat="server" ID="hfCaptcha" />
    </div>
    <script type="text/javascript">
        BlogEngine.comments.flagImage = BlogEngine.$("imgFlag");
        BlogEngine.comments.contentBox = BlogEngine.$("txtContent");
        BlogEngine.comments.moderation = <%=BlogSettings.Instance.EnableCommentsModeration.ToString().ToLowerInvariant() %>;
	    BlogEngine.comments.checkName = <%=(!Security.IsAuthenticated).ToString().ToLowerInvariant() %>;
	    BlogEngine.comments.postAuthor = "<%=Post.Author %>";
	    BlogEngine.comments.nameBox = BlogEngine.$("txtName");
	    BlogEngine.comments.emailBox = BlogEngine.$("txtEmail");
	    BlogEngine.comments.websiteBox = BlogEngine.$("txtWebsite");
	    BlogEngine.comments.countryDropDown = BlogEngine.$("ddlCountry");
	    BlogEngine.comments.controlId = '<%=UniqueID %>';
	    BlogEngine.comments.captchaField = BlogEngine.$('<%=hfCaptcha.ClientID %>');
        BlogEngine.comments.replyToId = BlogEngine.$("<%=hiddenReplyTo.ClientID %>");
    </script>
</asp:PlaceHolder>

<script type="text/javascript">
    function toggle_visibility(id, id2) {
        var e = document.getElementById(id);
        var h = document.getElementById(id2);
        if (e.style.display == 'block') {
            e.style.display = 'none';
            h.innerHTML = "+";
        }
        else {
            e.style.display = 'block';
            h.innerHTML = "-";
        }
    }
</script>

<asp:Label runat="server" ID="lbCommentsDisabled" CssClass="lbl-CommentsDisabled" Visible="false">
    <%=Resources.labels.commentsAreClosed %>
</asp:Label>

<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="<%=Post.Id %>" data-title="<%=Post.Title %>" data-url="<%=Post.AbsoluteLink %>"></div>
<!-- 多说评论框 end -->
<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
<script type="text/javascript">
    var duoshuoQuery = {short_name:"hellozhangxin"};
    (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0] 
         || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
</script>
<!-- 多说公共JS代码 end -->
