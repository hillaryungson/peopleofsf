<?php
	get_header();
?>


<div id="main" class="site-main">
	<div class="layout-medium">
		<div id="primary" class="content-area with-sidebar">
			<div id="content" class="site-content" role="main">
				<?php
					get_template_part( 'part', 'archive_title' );
				?>
				
				
				<div class="blog-regular">
					<?php
						if ( have_posts() ) :
							while ( have_posts() ) : the_post();
								?>
									<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
										<header class="entry-header">
											<h1 class="entry-title">
												<?php
													$hide_post_title = get_option( $post->ID . 'hide_post_title', false );
													
													if ( $hide_post_title )
													{
														$hide_post_title_out = 'style="display: none;"';
													}
													else
													{
														$hide_post_title_out = "";
													}
												?>
												<a <?php echo $hide_post_title_out; ?> href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
											</h1>
											
											
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
												if ( has_excerpt() )
												{
													the_excerpt();
													
													echo '<span class="more"><a class="more-link" href="'. get_permalink() . '">' . __( 'Read More', 'read' ) . '</a></span>';
												}
												else
												{
													$theme_excerpt = get_option( 'theme_excerpt', 'No' );
													
													if ( $theme_excerpt == 'Yes' )
													{
														the_excerpt();
													}
													elseif ( $theme_excerpt == 'standard' )
													{
														$format = get_post_format();
														
														if ( $format == false )
														{
															the_excerpt();
														}
														else
														{
															the_content( __( 'Read More', 'read' ) );
														}
													}
													else
													{
														the_content( __( 'Read More', 'read' ) );
													}
												}
											?>
											
											
											<?php
												wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'read' ), 'after' => '</div>' ) );
											?>
										</div>
									</article>
								<?php
							endwhile;
						endif;
						wp_reset_query();
					?>
					
					
					<?php
						get_template_part( 'part', 'pagination' );
					?>
				</div>
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