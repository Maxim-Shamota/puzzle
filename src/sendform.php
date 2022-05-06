<?php
//Сбор данных из полей формы. 
$name = $_POST['name'];// Берём данные из input c атрибутом name="name"
$phone = $_POST['phone']; // Берём данные из input c атрибутом name="phone"
$offer = $_POST['offer']; // Берём данные из input c атрибутом name="mail"

$token = "5360736800:AAEDGECqbj_oxbyiW-YaTnKaG6egJ9HbEns"; // Тут пишем токен
$chat_id = "-722841590"; // Тут пишем ID группы, куда будут отправляться сообщения
$sitename = "bob.shamota.site"; //Указываем название сайта

$arr = array(

  'Заказ с сайта: ' => $sitename,
  'Имя: ' => $name,
  'Телефон: ' => $phone,
  'Заказ из сервиса кабин: ' => $offer
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>