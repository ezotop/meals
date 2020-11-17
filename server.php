<?php
$_POST = json_decode(file_get_contents("php://input"), true); // Все что приходит от клиента, будет декодироваться из формата json
echo var_dump($_POST); //Выводим все то что приходит от клиента