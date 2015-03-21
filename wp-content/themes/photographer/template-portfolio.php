<?php
/*
Template Name: Portfolio
*/

get_header();
?>


<div id="main" class="site-main">
	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
			<?php
				$pixelwars_portfolio_page_content = get_option( 'pixelwars_portfolio_page_content', 'Top' );
				
				if ( $pixelwars_portfolio_page_content != 'Bottom' )
				{
					if ( have_posts() ) :
						while ( have_posts() ) : the_post();
							
							$page_content = get_the_content();
							
							if ( $page_content != "" )
							{
								?>
									<div class="layout-fixed">
										<div class="entry-content">
											<?php
												the_content();
											?>
										</div>
									</div>
								<?php
							}
							
						endwhile;
					endif;
					wp_reset_query();
				}
			?>
			
			
			<div class="layout-full">
				<div class="media-grid-wrap">
					<div class="gallery-grid">
						<?php
							$args_portfolio = array( 'post_type' => 'portfolio', 'posts_per_page' => -1 );
							$loop_portfolio = new WP_Query( $args_portfolio );
							
							if ( $loop_portfolio->have_posts() ) :
								while ( $loop_portfolio->have_posts() ) : $loop_portfolio->the_post();
									
									if ( has_post_thumbnail() )
									{
										?>
											<div id="post-<?php the_ID(); ?>" <?php post_class( 'masonry-item' ); ?>>
												<figure>
													<?php
														the_post_thumbnail( 'pixelwars_theme_image_size_760x507', array( 'alt' => the_title_attribute( 'echo=0' ), 'title' => "" ) );
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
			
			
			<?php
				if ( $pixelwars_portfolio_page_content == 'Bottom' )
				{
					if ( have_posts() ) :
						while ( have_posts() ) : the_post();
							
							$page_content = get_the_content();
							
							if ( $page_content != "" )
							{
								?>
									<div class="layout-fixed">
										<div class="entry-content">
											<?php
												the_content();
											?>
										</div>
									</div>
								<?php
							}
							
						endwhile;
					endif;
					wp_reset_query();
				}
			?>
		</div>
	</div>
</div>


<?php
	get_footer();
?>