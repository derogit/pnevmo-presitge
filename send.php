<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    function array_push_assoc($array, $key, $value)
    {
        $array[$key] = $value;
        return $array;
    }
    function parse_field_to_array($field, $fieldName, $arr)
    {
        if (isset($_POST["$field"])) {
            $field = $_POST["$field"];
            $fieldName = $fieldName . ': ';

            $arr = array_push_assoc($arr, $fieldName, $field);
            return $arr;
        } else
            return $arr;
    }

    $arr = array();
    $arr = parse_field_to_array('theme', 'Форма обратной связи', $arr);
    $arr = parse_field_to_array('name', 'Имя', $arr);
    $arr = parse_field_to_array('phone', 'Телефон', $arr);
    $arr = parse_field_to_array('city', 'Город', $arr);


    // var_dump($arr);

    /* http://api.telegram.org/bot1384119688:AAGp1UIzjIJ9DBgFQ6YW776LBdZpPn8XPUY/getUpdates */
    $token = get_env("TOKEN");
    $chat_id = get_env("CHAT_ID");

    foreach ($arr as $key => $value) {
        $txt .= "<b>" . $key . "</b> " . $value . "\n";
    }
    ;

    $txt = urlencode($txt);
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

    // var_dump("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");

    if ($sendToTelegram) {
        return true;
    }


}


?>