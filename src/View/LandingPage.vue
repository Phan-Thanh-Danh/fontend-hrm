
<template>
  <div class="landing-page-component">
    
      <!-- LOADER -->
      <div id="preloader">
         <img class="preloader" src="/landing/images/loaders/loader-realestate.gif" alt="" />
      </div>
      <!-- end loader -->
      <!-- END LOADER -->
      <header class="header header_style_01">
         <nav class="megamenu navbar navbar-default" data-spy="affix">
            <div class="container-fluid">
               <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="/landing"><img src="/landing/images/logos/logo.png" width="220" alt="image" /></a>
               </div>
               <div id="navbar" class="navbar-collapse collapse">
                  <ul class="nav navbar-nav navbar-right">
                     <li><a data-scroll href="#home">Trang chủ</a></li>
                     <li><a data-scroll href="#features">Tính năng <span class="hidden-xs">*</span></a></li>
                     <li><a data-scroll href="#agent">Nhà tuyển dụng</a></li>
                     <li><a data-scroll href="#gallery">Bộ sưu tập</a></li>
                     <li><a data-scroll href="#testimonials">Đánh giá</a></li>
                     <li><a data-scroll href="#support">Liên hệ</a></li>
                     <li class="social-links"><a href="#"><i class="fa fa-twitter global-radius"></i></a></li>
                     <li class="social-links"><a href="#"><i class="fa fa-facebook global-radius"></i></a></li>
                     <li class="social-links"><a href="#"><i class="fa fa-linkedin global-radius"></i></a></li>
                  
      <li><router-link to="/login" class="btn btn-primary" style="margin-top:20px;margin-left:15px;color:#fff !important;background-color:#007bff;border-color:#007bff;">Truy cập Portal CV / Đăng nhập</router-link></li>
      </ul>
    </div>
  </div>
  </nav>
      </header>
      <div id="home" class="parallax first-section" data-stellar-background-ratio="0.4" style="background-image:url('/landing/uploads/parallax.jpg');">
         <div class="container">
            <div class="row">
               <div class="col-md-6 col-sm-12">
                  <div class="big-tagline clearfix">
                     <h2>Xây dựng tương lai cùng AET</h2>
                     <p class="lead">Hệ thống quản trị nhân sự HRM chuyên nghiệp, giúp tối ưu hóa quy trình làm việc và phát triển nguồn nhân lực bền vững. </p>
                     <a data-scroll href="#gallery" class="btn btn-light btn-radius grd1 btn-brd">Xem bộ sưu tập</a>
                  </div>
               </div>
               <div class="col-md-6 wow slideInRight hidden-xs hidden-sm">
                  <div class="contact_form">
                     <h3><i class="fa fa-envelope-o grd1 global-radius"></i> ỨNG TUYỂN NHANH</h3>
                     <form id="contactform1" class="row" name="contactform" method="post" enctype="multipart/form-data">
                        <fieldset class="row-fluid">
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input type="text" name="full_name" id="full_name" class="form-control" placeholder="Họ và tên" />
                           </div>
                           
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input type="email" name="email1" id="email1" class="form-control" placeholder="Gmail" />
                           </div>
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label style="padding-left:15px; color:#666; font-size:12px;">Tải lên CV của bạn:</label>
                              <input type="file" name="cv_file" class="form-control" />
                           </div>
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label style="padding-left:15px; color:#666; font-size:12px;">Tải lên JD (nếu có):</label>
                              <input type="file" name="jd_file" class="form-control" />
                           </div>
                           
                           
                           
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                              <button type="submit" value="SEND" id="submit1" class="btn btn-light btn-radius btn-brd grd1 btn-block">Gửi hồ sơ ngay</button>
                           </div>
                        </fieldset>
                     </form>
                  </div>
               </div>
            </div>
            <!-- end row -->
         </div>
         <!-- end container -->
      </div>
      <!-- end section -->
      <div id="features" class="section wb">
         <div class="container">
            <div class="section-title row text-center">
               <div class="col-md-8 col-md-offset-2">
                  <small>All Awesome Chi tiết cơ hội nghề nghiệp</small>
                  <h3>Chi tiết cơ hội nghề nghiệp</h3>
                  <p class="lead">Chúng tôi luôn tìm kiếm những nhân tài khao khát khẳng định bản thân và đóng góp vào những dự án công nghệ mang tầm quốc tế.</p>
               </div>
               <!-- end col -->
            </div>
            <!-- end title -->
            <div class="property-detail row clearfix">
               <div class="col-md-2 col-sm-3 col-xs-6">
                  <i class="flaticon-coupon effect-1"></i>
                  <h4>Môi trường làm việc : 3200</h4>
               </div>
               <!-- end col -->
               <div class="col-md-2 col-sm-3 col-xs-6">
                  <i class="flaticon-family-room effect-1"></i>
                  <h4>Phúc lợi hấp dẫn</h4>
               </div>
               <!-- end col -->
               <div class="col-md-2 col-sm-3 col-xs-6">
                  <i class="flaticon-house effect-1"></i>
                  <h4>Cơ sở hiện đại : 2</h4>
               </div>
               <!-- end col -->  
               <div class="col-md-2 col-sm-3 col-xs-6">
                  <i class="flaticon-full-bed effect-1"></i>
                  <h4>Số lượng tuyển : 3</h4>
               </div>
               <!-- end col -->  
               <div class="col-md-2 col-sm-3 col-xs-6">
                  <i class="flaticon-swimming-Dự án quốc tế effect-1"></i>
                  <h4>Dự án quốc tế : Yes</h4>
               </div>
               <!-- end col -->
               <div class="col-md-2 col-sm-3 col-xs-6">
                  <i class="flaticon-calendar effect-1"></i>
                  <h4>Thành lập từ : 2015</h4>
               </div>
               <!-- end col -->  
            </div>
            <!-- end how-its-work -->
            <hr class="invis" />
            <div class="row text-center">
               <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="service-widget">
                     <div class="post-media wow fadeIn">
                        <a href="/landing/uploads/estate_01.jpg" data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i class="flaticon-unlink"></i></a>
                        <img src="/landing/uploads/estate_01.jpg" alt="" class="img-responsive img-rounded" />
                     </div>
                     <h3>Văn phòng làm việc sáng tạo</h3>
                     <p>Gia nhập đội ngũ AET, bạn sẽ được trải nghiệm một môi trường làm việc cởi mở, nơi mọi đóng góp đều được trân trọng và đền đáp xứng đáng.</p>
                  </div>
                  <!-- end service -->
               </div>
               <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="service-widget">
                     <div class="post-media wow fadeIn">
                        <a href="/landing/uploads/estate_03.jpg" data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i class="flaticon-unlink"></i></a>
                        <img src="/landing/uploads/estate_03.jpg" alt="" class="img-responsive img-rounded" />
                     </div>
                     <h3>With its Own Dự án quốc tế</h3>
                     <p>Chúng tôi tin rằng con người chính là tài sản quý giá nhất. Vì vậy, AET luôn đầu tư vào sự phát triển cá nhân của mỗi thành viên qua các khóa đào tạo. </p>
                  </div>
                  <!-- end service -->
               </div>
               <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="service-widget">
                     <div class="post-media wow fadeIn">
                        <a href="/landing/uploads/estate_02.jpg" data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i class="flaticon-unlink"></i></a>
                        <img src="/landing/uploads/estate_02.jpg" alt="" class="img-responsive img-rounded" />
                     </div>
                     <h3>Môi trường năng động</h3>
                     <p>Hãy cùng chúng tôi xây dựng những giải pháp công nghệ tiên phong, giúp thay đổi cách vận hành của các doanh nghiệp trong tương lai.</p>
                  </div>
                  <!-- end service -->
               </div>
            </div>
            <!-- end row -->
         </div>
         <!-- end container -->
         <div class="sep1"></div>
      </div>
      <!-- end section -->
      <div id="agent" class="parallax section db parallax-off" style="background-image:url('/landing/uploads/parallax_02.png');">
         <div class="container">
            <div class="section-title row text-center">
               <div class="col-md-8 col-md-offset-2">
                  <h3>Thông tin người liên hệ</h3>
                  <p class="lead">Chúng tôi luôn tìm kiếm những nhân tài khao khát khẳng định bản thân và đóng góp vào những dự án công nghệ mang tầm quốc tế.</p>
               </div>
               <!-- end col -->
            </div>
            <!-- end title -->
            <div class="row">
               <div class="col-md-3">
                  <div class="post-media wow fadeIn">
                     <img src="/landing/uploads/agent.jpg" alt="" class="img-responsive img-rounded" />
                     <a href="http://www.youtube.com/watch?v=nrJtHemSPW4" data-rel="prettyPhoto[gal]" class="playbutton"><i class="flaticon-play-button"></i></a>
                  </div>
                  <!-- end media -->
               </div>
               <!-- end col -->
               <div class="col-md-6">
                  <div class="message-box">
                     <h4>Nhà tuyển dụng</h4>
                     <h2>Trần Thanh Tâm</h2>
                     <p class="lead">Chúng tôi luôn tìm kiếm những nhân tài khao khát khẳng định bản thân và đóng góp vào những dự án công nghệ mang tầm quốc tế.</p>
                     <p> Tiền thân là một đội ngũ đam mê công nghệ, AET đã vươn mình trở thành đối tác tin cậy của hàng nghìn doanh nghiệp trong lĩnh vực quản trị nhân sự. </p>
                     <a href="#contact" data-scroll class="btn btn-light global-radius btn-brd grd1 effect-1">Contact Me</a>
                  </div>
                  <!-- end messagebox -->
               </div>
               <!-- end col -->
               <div class="col-md-3">
                  <div class="agencies_meta clearfix">
                     <span><i class="fa fa-envelope "></i> <a href="mailto:support@sitename.com">support@sitename.com</a></span>
                     <span><i class="fa fa-link "></i> <a href="#">www.sitename.com</a></span>
                     <span><i class="fa fa-phone-square "></i> +1 232 444 55 66</span>
                     <span><i class="fa fa-print "></i> +1 232 444 55 66</span>
                     <span><i class="fa fa-facebook-square "></i> <a href="#">facebook.com/tagline</a></span>
                     <span><i class="fa fa-twitter-square "></i> <a href="#">twitter.com/tagline</a></span>
                     <span><i class="fa fa-linkedin-square "></i> <a href="#">linkedin.com/tagline</a></span>
                  </div>
                  <!-- end agencies_meta -->
               </div>
               <!-- end col -->
            </div>
            <!-- end row -->
         </div>
      </div>
      <div id="gallery" class="section wb">
         <div class="sep2"></div>
         <div class="container">
            <div class="section-title row text-center">
               <div class="col-md-8 col-md-offset-2">
                  <h3>Hoạt động văn hoá</h3>
                  <p class="lead">Chúng tôi luôn tìm kiếm những nhân tài khao khát khẳng định bản thân và đóng góp vào những dự án công nghệ mang tầm quốc tế.</p>
               </div>
               <!-- end col -->
            </div>
            <!-- end title -->
            <div id="da-thumbs" class="da-thumbs portfolio">
               <div class="post-media pitem item-w1 item-h1 cat1">
                  <a href="/landing/uploads/home_01.jpg" data-rel="prettyPhoto[gal]">
                     <img src="/landing/uploads/home_01.jpg" alt="" class="img-responsive" />
                     <div>
                        <i class="flaticon-unlink"></i>
                     </div>
                  </a>
               </div>
               <div class="post-media pitem item-w1 item-h1 cat2">
                  <a href="/landing/uploads/home_02.jpg" data-rel="prettyPhoto[gal]">
                     <img src="/landing/uploads/home_02.jpg" alt="" class="img-responsive" />
                     <div>
                        <i class="flaticon-unlink"></i>
                     </div>
                  </a>
               </div>
               <div class="post-media pitem item-w1 item-h1 cat1">
                  <a href="/landing/uploads/home_03.jpg" data-rel="prettyPhoto[gal]">
                     <img src="/landing/uploads/home_03.jpg" alt="" class="img-responsive" />
                     <div>
                        <i class="flaticon-unlink"></i>
                     </div>
                  </a>
               </div>
               <div class="post-media pitem item-w1 item-h1 cat3">
                  <a href="/landing/uploads/home_04.jpg" data-rel="prettyPhoto[gal]">
                     <img src="/landing/uploads/home_04.jpg" alt="" class="img-responsive" />
                     <div>
                        <i class="flaticon-unlink"></i>
                     </div>
                  </a>
               </div>
               <div class="post-media pitem item-w1 item-h1 cat2">
                  <a href="/landing/uploads/home_05.jpg" data-rel="prettyPhoto[gal]">
                     <img src="/landing/uploads/home_05.jpg" alt="" class="img-responsive" />
                     <div>
                        <i class="flaticon-unlink"></i>
                     </div>
                  </a>
               </div>
               <div class="post-media pitem item-w1 item-h1 cat1">
                  <a href="/landing/uploads/home_06.jpg" data-rel="prettyPhoto[gal]">
                     <img src="/landing/uploads/home_06.jpg" alt="" class="img-responsive" />
                     <div>
                        <i class="flaticon-unlink"></i>
                     </div>
                  </a>
               </div>
            </div>
            <!-- end portfolio -->
         </div>
         <!-- end container -->
      </div>
      <!-- end section -->
      <div id="testimonials" class="section lb">
         <div class="container">
            <div class="section-title row text-center">
               <div class="col-md-8 col-md-offset-2">
                  <h3>Cảm nhận từ thành viên</h3>
                  <p class="lead">Chúng tôi luôn tìm kiếm những nhân tài khao khát khẳng định bản thân và đóng góp vào những dự án công nghệ mang tầm quốc tế.</p>
               </div>
               <!-- end col -->
            </div>
            <!-- end title -->
            <div class="row">
               <div class="col-md-12 col-sm-12">
                  <div class="testi-carousel owl-carousel owl-theme">
                     <div class="testimonial clearfix">
                        <div class="desc">
                           <h3><i class="fa fa-quote-left"></i> Đào tạo chuyên sâu!</h3>
                           <p class="lead">Tôi thực sự ấn tượng với tốc độ làm việc và sự hỗ trợ nhiệt tình từ đội ngũ AET. Môi trường ở đây rất chuyên nghiệp và thân thiện.</p>
                        </div>
                        <div class="testi-meta">
                           <img src="/landing/uploads/testi_01.png" alt="" class="img-responsive alignleft" />
                           <h4>James Fernando <small>- Manager of Racer</small></h4>
                        </div>
                        <!-- end testi-meta -->
                     </div>
                     <!-- end testimonial -->
                     <div class="testimonial clearfix">
                        <div class="desc">
                           <h3><i class="fa fa-quote-left"></i> Lộ trình thăng tiến!</h3>
                           <p class="lead">Làm việc tại đây giúp tôi học hỏi được rất nhiều từ những anh chị đi trước. Các dự án luôn đầy thử thách và giúp tôi tiến bộ mỗi ngày.</p>
                        </div>
                        <div class="testi-meta">
                           <img src="/landing/uploads/testi_02.png" alt="" class="img-responsive alignleft" />
                           <h4>Jacques Philips <small>- Designer</small></h4>
                        </div>
                        <!-- end testi-meta -->
                     </div>
                     <!-- end testimonial -->
                     <div class="testimonial clearfix">
                        <div class="desc">
                           <h3><i class="fa fa-quote-left"></i> Đội ngũ tài năng!</h3>
                           <p class="lead">Chế độ đãi ngộ và lộ trình thăng tiến rõ ràng là điều thu hút tôi nhất. Tôi cảm thấy an tâm khi xây dựng sự nghiệp lâu dài tại AET. </p>
                        </div>
                        <div class="testi-meta">
                           <img src="/landing/uploads/testi_03.png" alt="" class="img-responsive alignleft" />
                           <h4>Venanda Mercy <small>- Newyork City</small></h4>
                        </div>
                        <!-- end testi-meta -->
                     </div>
                     <!-- end testimonial -->
                     <div class="testimonial clearfix">
                        <div class="desc">
                           <h3><i class="fa fa-quote-left"></i> Đào tạo chuyên sâu!</h3>
                           <p class="lead">Tôi thực sự ấn tượng với tốc độ làm việc và sự hỗ trợ nhiệt tình từ đội ngũ AET. Môi trường ở đây rất chuyên nghiệp và thân thiện.</p>
                        </div>
                        <div class="testi-meta">
                           <img src="/landing/uploads/testi_01.png" alt="" class="img-responsive alignleft" />
                           <h4>James Fernando <small>- Manager of Racer</small></h4>
                        </div>
                        <!-- end testi-meta -->
                     </div>
                     <!-- end testimonial -->
                     <div class="testimonial clearfix">
                        <div class="desc">
                           <h3><i class="fa fa-quote-left"></i> Lộ trình thăng tiến!</h3>
                           <p class="lead">Làm việc tại đây giúp tôi học hỏi được rất nhiều từ những anh chị đi trước. Các dự án luôn đầy thử thách và giúp tôi tiến bộ mỗi ngày.</p>
                        </div>
                        <div class="testi-meta">
                           <img src="/landing/uploads/testi_02.png" alt="" class="img-responsive alignleft" />
                           <h4>Jacques Philips <small>- Designer</small></h4>
                        </div>
                        <!-- end testi-meta -->
                     </div>
                     <!-- end testimonial -->
                     <div class="testimonial clearfix">
                        <div class="desc">
                           <h3><i class="fa fa-quote-left"></i> Đội ngũ tài năng!</h3>
                           <p class="lead">Chế độ đãi ngộ và lộ trình thăng tiến rõ ràng là điều thu hút tôi nhất. Tôi cảm thấy an tâm khi xây dựng sự nghiệp lâu dài tại AET. </p>
                        </div>
                        <div class="testi-meta">
                           <img src="/landing/uploads/testi_03.png" alt="" class="img-responsive alignleft" />
                           <h4>Venanda Mercy <small>- Newyork City</small></h4>
                        </div>
                        <!-- end testi-meta -->
                     </div>
                     <!-- end testimonial -->
                  </div>
                  <!-- end carousel -->
               </div>
               <!-- end col -->
            </div>
            <!-- end row -->
         </div>
         <!-- end container -->
      </div>
      <!-- end section -->
      <div id="map"></div>
      <div id="support" class="section wb">
         <div class="container">
            <div class="section-title text-center">
               <h3>Trở thành một phần của AET ngay hôm nay</h3>
               <p class="lead">Let us give you more details Giới thiệu the special offer website you want us. Please fill out the form below. <br />We have million of website owners who happy to work with us!</p>
            </div>
            <!-- end title -->
            <div class="row">
               <div class="col-md-8 col-md-offset-2">
                  <div class="contact_form">
                     <div id="message"></div>
                     <form id="contactform" class="row" action="contact.php" name="contactform" method="post" enctype="multipart/form-data">
                        <fieldset class="row-fluid">
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input type="text" name="full_name" id="full_name" class="form-control" placeholder="Họ và tên" />
                           </div>
                           
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input type="email" name="email" id="email" class="form-control" placeholder="Gmail" />
                           </div>
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label style="padding-left:15px; color:#666; font-size:12px;">Tải lên CV của bạn:</label>
                              <input type="file" name="cv_file" class="form-control" />
                           </div>
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label style="padding-left:15px; color:#666; font-size:12px;">Tải lên JD (nếu có):</label>
                              <input type="file" name="jd_file" class="form-control" />
                           </div>
                           
                           
                           
                           
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                              <button type="submit" value="SEND" id="submit" class="btn btn-light btn-radius btn-brd grd1 btn-block">Gửi hồ sơ</button>
                           </div>
                        </fieldset>
                     </form>
                  </div>
               </div>
               <!-- end col -->
            </div>
            <!-- end row -->
         </div>
         <!-- end container -->
      </div>
      <!-- end section -->
      <footer class="footer">
         <div class="container">
            <div class="row">
               <div class="col-md-4 col-sm-4 col-xs-12">
                  <div class="widget clearfix">
                     <div class="widget-title">
                        <img src="/landing/images/logos/logo.png" width="210" alt="" />
                     </div>
                     <p> Integer rutrum ligula eu dignissim laoreet. Pellentesque venenatis nibh sed tellus faucibus bibendum. Sed fermentum est vitae rhoncus molestie. Cum sociis natoque penatibus et magnis dis montes.</p>
                     <p>Sed fermentum est vitae rhoncus molestie. Cum sociis natoque penatibus et magnis dis montes.</p>
                  </div>
                  <!-- end clearfix -->
               </div>
               <!-- end col -->
               <div class="col-md-3 col-sm-3 col-xs-12">
                  <div class="widget clearfix">
                     <div class="widget-title">
                        <h3>Thông tin liên hệ</h3>
                     </div>
                     <ul class="footer-links">
                        <li><a href="mailto:#">info@yoursite.com</a></li>
                        <li><a href="#">www.yoursite.com</a></li>
                        <li>PO Box 16122 Collins Street West Victoria 8007 Australia</li>
                        <li>+61 3 8376 6284</li>
                     </ul>
                     <!-- end links -->
                  </div>
                  <!-- end clearfix -->
               </div>
               <!-- end col -->
               <div class="col-md-3 col-sm-3 col-xs-12">
                  <div class="widget clearfix">
                     <div class="widget-title">
                        <h3>Tin tuyển dụng mới</h3>
                     </div>
                     <ul class="twitter-widget footer-links">
                        <li><a href="#"><i class="fa fa-twitter"></i> @Rt_miOnline o zaman en yakın Apple Store seni bekler geçmiş olsun</a></li>
                        <li><a href="#"><i class="fa fa-twitter"></i> @Harry - Thanks you so much for your help. Still waiting update for my Ticket!</a></li>
                        <li><a href="#"><i class="fa fa-twitter"></i> @MedyaPet - Welcome to the our community dude! You are awesome!</a></li>
                     </ul>
                     <!-- end links -->
                  </div>
                  <!-- end clearfix -->
               </div>
               <!-- end col -->
               <div class="col-md-2 col-sm-2 col-xs-12">
                  <div class="widget clearfix">
                     <div class="widget-title">
                        <h3>Mạng xã hội</h3>
                     </div>
                     <ul class="footer-links">
                        <li><a href="#"><i class="fa fa-facebook"></i> 22.543 Likes</a></li>
                        <li><a href="#"><i class="fa fa-github"></i> 128 Projects</a></li>
                        <li><a href="#"><i class="fa fa-twitter"></i> 12.860 Followers</a></li>
                        <li><a href="#"><i class="fa fa-dribbble"></i> 3312 Shots</a></li>
                        <li><a href="#"><i class="fa fa-pinterest"></i>3331 Pins</a></li>
                     </ul>
                     <!-- end links -->
                  </div>
                  <!-- end clearfix -->
               </div>
               <!-- end col -->
            </div>
            <!-- end row -->
         </div>
         <!-- end container -->
      </footer>
      <!-- end footer -->
      <div class="copyrights">
         <div class="container">
            <div class="footer-distributed">
               <div class="footer-left">
                  <p class="footer-links">
                     <a href="#">Trang chủ</a>
                     <a href="#">Tin tức</a>
                     <a href="#">Đãi ngộ</a>
                     <a href="#">Giới thiệu</a>
                     <a href="#">Hỏi đáp</a>
                     <a href="#">Liên hệ</a>
                  </p>
                  <p class="footer-company-name">Bản quyền thuộc về AET. <a href="https://html.design/">html.design</a> &copy; 2021</p>
               </div>
               <div class="footer-right">
                  <form method="get" action="#">
                     <input placeholder="Subscribe our newsletter.." name="search" />
                     <i class="fa fa-envelope-o"></i>
                  </form>
               </div>
            </div>
         </div>
         <!-- end container -->
      </div>
      <!-- end copyrights -->
      <a href="#home" data-scroll class="dmtop global-radius"><i class="fa fa-angle-up"></i></a>
      <!-- ALL JS FILES -->
      
      <!-- ALL PLUGINS -->
      
      
          
      
      <!-- MAP & CONTACT -->
      
   
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const cssFiles = [
  '/landing/css/bootstrap.min.css',
  '/landing/style.css',
  '/landing/css/colors.css',
  '/landing/css/versions.css',
  '/landing/css/responsive.css',
  '/landing/css/custom.css',
];

const jsFiles = [
  '/landing/js/modernizer.js',
  '/landing/js/all.js',
  '/landing/js/custom.js',
  '/landing/js/portfolio.js',
  '/landing/js/hoverdir.js',
  'http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places',
  '/landing/js/map.js'
];

let addedElements = [];

const loadScript = (src) => {
  return new Promise((resolve) => {
    if(document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.dataset.landing = 'true';
    script.onload = resolve;
    script.onerror = () => { console.warn('Failed to load script', src); resolve(); };
    document.body.appendChild(script);
    addedElements.push(script);
  });
};

onMounted(async () => {
  document.body.classList.add("realestate_version");
  cssFiles.forEach(href => {
    if(!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.dataset.landing = 'true';
        document.head.appendChild(link);
        addedElements.push(link);
    }
  });
  for (const src of jsFiles) {
    await loadScript(src);
  }
});

onUnmounted(() => {
  document.body.classList.remove("realestate_version");
  addedElements.forEach(el => el.remove());
  document.body.style = '';
});
</script>

<style scoped>
.landing-page-component {
  text-align: left;
}
.landing-page-component label {
  color: #666;
  margin-top: 5px;
  display: block;
}
.landing-page-component .contact_form input {
  margin-bottom: 10px;
}
</style>
