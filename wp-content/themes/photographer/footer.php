        <footer id="colophon" class="site-footer" role="contentinfo">
			<div class="layout-medium">
                <div class="footer-social">
					<?php
						if ( ! function_exists( 'dynamic_sidebar' ) || ! dynamic_sidebar( 'pixelwars_footer_sidebar' ) ) :
						endif;
					?>
                </div>
				
				<div class="site-info">
					<p>
						<?php
							$copyright_text = stripcslashes( get_option( 'copyright_text', "" ) );
							
							echo $copyright_text;
						?>
					</p>
				</div>
			</div>
		</footer>
	</div>
    
	
	<?php
		wp_footer();
	?>
</body>
</html>