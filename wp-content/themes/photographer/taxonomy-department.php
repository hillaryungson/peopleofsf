<?php
	get_header();
?>


<div id="main" class="site-main">
	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
			<div class="layout-full">
				<header class="entry-header">
					<h1 class="entry-title"><?php single_cat_title(); ?></h1>
				</header>
				
				
				<div class="media-grid-wrap">
					<div class="gallery-grid">
						<?php
							$parent_department_slug = get_query_var( 'term' );
							
							$args_portfolio = array( 'post_type' => 'portfolio', 'department' => $parent_department_slug, 'posts_per_page' => -1 );
							$loop_portfolio = new WP_Query( $args_portfolio );
							
							
							if ( $loop_portfolio->have_posts() ) :
								while ( $loop_portfolio->have_posts() ) : $loop_portfolio->the_post();
									
									
									if ( has_post_thumbnail() )
									{
										?>
											<div id="post-<?php the_ID(); ?>" <?php post_class( 'masonry-item' ); ?>>
												<figure>
													<?php
														the_post_thumbnail( 'pixelwars_theme_image_size_600', array( 'alt' => the_title_attribute( 'echo=0' ), 'title' => "" ) );
													?>
													
													<figcaption>
														<h2><?php the_title(); ?></h2>
														
														<?php
															$pf_short_description = stripcslashes( get_option( get_the_ID() . 'pf_short_description', "" ) );
														?>
														<p><?php echo $pf_short_description; ?></p>
														
														<a href="<?php the_permalink(); ?>"></a>
													</figcaption>
												</figure>
											</div>
										<?php
									}
									
								endwhile;
							endif;
							wp_reset_query();
						?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<?php
	get_footer();
?>