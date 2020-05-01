<footer>
        <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
        <script type="text/javascript" src="script.js"></script>
        <div class="footer">
            <div>&copy;
                <script>
                    document.write(new Date().getFullYear());
                </script> Gladys Ganda, S3679389 . Last modified
                <?= date ("Y F d  H:i", filemtime($_SERVER['SCRIPT_FILENAME'])); ?>.</div>
            <div id='detail'>
                <p>Email : support@lunardo.com
                    <br> Phone : +61368273918
                    <br> Address : 80 Swanston St, Melbourne 3000 VIC </div>
            <div>
                <button id='toggleWireframeCSS' onclick='toggleWireframe()'>Toggle Wireframe CSS</button>
            </div>
        </div>
        <a href="https://github.com/s3679389/wp">Link to github</a>
    </footer>

</body>

</html>