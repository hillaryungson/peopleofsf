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
						Copyright © 2015 People of SF
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