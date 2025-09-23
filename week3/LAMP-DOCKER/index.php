<?php

$connect = mysqli_connect(
    'db',           // Docker Compose 服务名（MySQL 主机）
    'lamp_docker',  // 用户名（你在 docker-compose.yml 里设的 MYSQL_USER）
    'password',     // 密码（你在 docker-compose.yml 里设的 MYSQL_PASSWORD）
    'lamp_docker'   // 数据库名（你在 docker-compose.yml 里设的 MYSQL_DATABASE）
);

if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = 'SELECT * FROM blog';
$result = mysqli_query($connect, $query);

echo '<h1>MySQL Content</h1>';

while ($record = mysqli_fetch_assoc($result)) {
    echo '<h2>'.$record['title'].'</h2>';
    echo '<p>'.$record['content'].'</p>';
    echo '<hr>';
}

mysqli_close($connect);
?>