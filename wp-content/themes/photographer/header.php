<?php
	if ( isset( $_SERVER['HTTP_USER_AGENT'] ) && ( strpos( $_SERVER['HTTP_USER_AGENT'], 'MSIE' ) !== false ) )
	{
		header( 'X-UA-Compatible: IE=edge,chrome=1' );
	}
	
	
	$home_landing = "";
	
	if ( is_page_template( 'template-homepage_landing.php' ) )
	{
		$home_landing = 'home-landing';
	}
	
	
	$no_fludibox = "";
	$pixelwars__fluidbox = get_option( 'pixelwars__fluidbox', 'Yes' );
	
	if ( $pixelwars__fluidbox == 'No' )
	{
		$no_fludibox = 'no-fludibox';
	}
?>
<!doctype html>

<html <?php language_attributes(); ?> class="<?php echo $home_landing; ?> <?php echo $no_fludibox; ?>">

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	
	<?php
		$mobile_zoom = get_option( 'mobile_zoom', 'Yes' );
		
		if ( $mobile_zoom == 'No' )
		{
			?>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
			<?php
		}
		else
		{
			?>
<meta name="viewport" content="width=device-width, initial-scale=1">
			<?php
		}
	?>
	
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	
	<?php
		wp_head();
	?>
</head>

<body <?php body_class(); ?>>
	
    <div id="page" class="hfeed site">
        <header id="masthead" class="site-header" role="banner">
			<div class="site-logo">
				<?php
					$logo_type = get_option( 'logo_type', 'Text Logo' );
					
					if ( $logo_type == 'Image Logo' )
					{
						$logo_image = get_option( 'logo_image', "" );
						
						?>
							<h1 class="site-title">
								<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
									<img alt="<?php bloginfo( 'name' ); ?>" src="<?php echo esc_url( $logo_image ); ?>">
								</a>
							</h1>
						<?php
					}
					else
					{
						$select_text_logo = get_option( 'select_text_logo', 'WordPress Site Title' );
						
						if ( $select_text_logo == 'Theme Site Title' )
						{
							$text_logo_out = stripcslashes( get_option( 'theme_site_title', "" ) );
						}
						else
						{
							$text_logo_out = get_bloginfo( 'name' );
						}
						
						?>
							<h1 class="site-title">
								<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php echo $text_logo_out; ?></a>
							</h1>
						<?php
						
						
						$select_tagline = get_option( 'select_tagline', 'WordPress Tagline' );
						
						if ( $select_tagline == 'WordPress Tagline' )
						{
							?>
								<p class="site-description">vignettes of the bay</p>
							<?php
						}
						else
						{
							$theme_tagline = stripcslashes( get_option( 'theme_tagline', "" ) );
							
							if ( $theme_tagline != "" )
							{
								?>
									<p class="site-description"><?php echo $theme_tagline; ?></p>
								<?php
							}
						}
					}
				?>
			</div>
			
			
			<nav id="primary-navigation" class="site-navigation primary-navigation" role="navigation">
				
				<a class="menu-toggle"><span class="lines"></span></a>
				
				<div class="nav-menu">
					<?php
						wp_nav_menu( array( 'theme_location' => 'pixelwars_theme_menu_location_1',
											'menu'           => 'pixelwars_theme_menu_location_1',
											'menu_id'        => 'nav',
											'menu_class'     => 'menu-custom vs-nav',
											'container'      => false,
											'depth'          => 0,
											'fallback_cb'    => 'pixelwars_wp_page_menu2' ) );
					?>
				</div>
			</nav>
        </header>