<?php
	get_header();
?>


<div id="main" class="site-main">
	<div class="layout-medium">
		<div id="primary" class="content-area with-sidebar">
			<div id="content" class="site-content" role="main">
				<?php
					if ( have_posts() ) :
						while ( have_posts() ) : the_post();
							?>
								<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
									<header class="entry-header">
										<?php
											$hide_post_title = get_option( $post->ID . 'hide_post_title', false );
											
											if ( $hide_post_title )
											{
												$hide_post_title = 'style="display: none;"';
											}
											else
											{
												$hide_post_title = "";
											}
										?>
										<h1 class="entry-title" <?php echo $hide_post_title; ?>><?php the_title(); ?></h1>
										
										
										<div class="entry-meta">
											<span class="entry-date">
												<time class="entry-date" datetime="2012-02-13T04:34:10+00:00"><?php echo get_the_date(); ?></time>
											</span>
											
											
											<span class="comment-link">
												<?php
													comments_popup_link( __( '0 Comment', 'read' ), __( '1 Comment', 'read' ), __( '% Comments', 'read' ) );
												?>
											</span>
											
											
											<span class="cat-links">
												<?php
													the_category( ', ' );
												?>
											</span>
											
											
											<?php
												edit_post_link( __( 'Edit', 'read' ), '<span class="edit-link">', '</span>' );
											?>
										</div>
									</header>
									
									
									<?php
										if ( has_post_thumbnail() )
										{
											?>
												<div class="featured-image">
													<?php
														the_post_thumbnail( 'pixelwars_theme_image_size_1000', array( 'alt' => the_title_attribute( 'echo=0' ), 'title' => "" ) );
													?>
												</div>
											<?php
										}
									?>
									
									
									<div class="entry-content">
										<?php
											the_content();
										?>
										
										
										<?php
											wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'read' ), 'after' => '</div>' ) );
										?>
										
										
										<?php
											if ( get_the_tags() != "" )
											{
												?>
													<div class="post-tags tagcloud">
														<?php
															the_tags( "", ' ', "" );
														?>
													</div>
												<?php
											}
										?>
										
										
										<?php
											get_template_part( 'part', 'share_links' );
										?>
										
										
										<nav class="nav-single row">
											<div class="nav-previous col-sm-6">
												<?php
													previous_post_link( '<h4>' . __( 'PREVIOUS POST', 'read' ) . '</h4>%link', '<span class="meta-nav">&#8592;</span> %title' );
												?>
											</div>
											
											<div class="nav-next col-sm-6">
												<?php
													next_post_link( '<h4>' . __( 'NEXT POST', 'read' ) . '</h4>%link', '%title <span class="meta-nav">&#8594;</span>' );
												?>
											</div>
										</nav>
										
										
										<?php
											$about_the_author_module = get_option( 'about_the_author_module', 'Yes' );
											
											if ( $about_the_author_module == 'Yes' )
											{
												get_template_part( 'part', 'about_author' );
											}
										?>
									</div>
								</article>
								
								
								<?php
									comments_template( "", true );
								?>
							<?php
						endwhile;
					endif;
					wp_reset_query();
				?>
			</div>
		</div>
		
		
		<?php
			get_sidebar();
		?>
	</div>
</div>


<?php
	get_footer();
?>