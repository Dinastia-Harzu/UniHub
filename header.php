<header>
<aside id="logobsq">
    <a href="index.php"><img id="logo" src="imagenes/LogoNegro.png" alt="Logo de UniHub"></a>
</aside>
<nav id="menu">
    <?php
        $current_page = $_SERVER['REQUEST_URI'];
        $last_path_segment = basename(parse_url($current_page, PHP_URL_PATH));

        $opciones = [   
            '<li><a class="opNav" href="index.php">Inicio</a></li>',
            '<li><a class="opNav" href="index.php">Descubrir</a></li>',
            '<li><a class="opNav" href="index.php">Buscar</a></li>'
        ];
        $botones = [
            '<li><a class="btn btnNav" href="index.php">Iniciar Sesión</a></li>',
            '<li><a class="btn btnNav" href="index.php">Registrarse</a></li>'
        ];
    ?>
</nav>
</header>