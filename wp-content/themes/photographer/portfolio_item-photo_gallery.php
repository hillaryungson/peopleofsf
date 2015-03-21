<?php
	get_header();
?>


<div id="main" class="site-main">
	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
			<div class="layout-full">
				<?php
					if ( have_posts() ) :
						while ( have_posts() ) : the_post();
							?>
								<div id="post-<?php the_ID(); ?>" <?php post_class( 'gallery-single' ); ?>>
									<header class="entry-header">
										<h1 class="entry-title"><?php the_title(); ?></h1>
									</header>
									
									
									<div class="entry-content">
										<?php
											the_content();
										?>
										
										<?php
											wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'read' ), 'after' => '</div>' ) );
										?>
									</div>
									
									
									<nav class="row nav-single">
										<div class="col-sm-6 nav-previous">
											<?php
												next_post_link( '<h4>' . __( 'PREVIOUS', 'read' ) . '</h4>' . '%link', '<span class="meta-nav">&#8592;</span> %title' );
											?>
										</div>
										
										<div class="col-sm-6 nav-next">
											<?php
												previous_post_link( '<h4>' . __( 'NEXT', 'read' ) . '</h4>' . '%link', '%title <span class="meta-nav">&#8594;</span>' );
											?>
										</div>
									</nav>
								</div>
								
								
								<!-- Root element of PhotoSwipe. Must have class pswp. -->
								<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
									<div class="pswp__bg"></div>
									<div class="pswp__scroll-wrap">
										<div class="pswp__container">
											<div class="pswp__item"></div>
											<div class="pswp__item"></div>
											<div class="pswp__item"></div>
										</div>
										<div class="pswp__ui pswp__ui--hidden">
											<div class="pswp__top-bar">
												<div class="pswp__counter"></div>
												<button class="pswp__button pswp__button--close" title="<?php echo __( 'Close (Esc)', 'read' ); ?>"></button>
												<button class="pswp__button pswp__button--share" title="<?php echo __( 'Share', 'read' ); ?>"></button>
												<button class="pswp__button pswp__button--fs" title="<?php echo __( 'Toggle fullscreen', 'read' ); ?>"></button>
												<button class="pswp__button pswp__button--zoom" title="<?php echo __( 'Zoom in/out', 'read' ); ?>"></button>
												<div class="pswp__preloader">
													<div class="pswp__preloader__icn">
														<div class="pswp__preloader__cut">
															<div class="pswp__preloader__donut"></div>
														</div>
													</div>
												</div>
											</div>
											<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
												<div class="pswp__share-tooltip"></div>
											</div>
											<button class="pswp__button pswp__button--arrow--left" title="<?php echo __( 'Previous (arrow left)', 'read' ); ?>"></button>
											<button class="pswp__button pswp__button--arrow--right" title="<?php echo __( 'Next (arrow right)', 'read' ); ?>"></button>
											<div class="pswp__caption">
												<div class="pswp__caption__center"></div>
											</div>
										</div>
									</div>
								</div>
								<!-- Root element of PhotoSwipe -->
							<?php
						endwhile;
					endif;
					wp_reset_query();
				?>
			</div>
		</div>
	</div>
</div>


<?php
	get_footer();
?>