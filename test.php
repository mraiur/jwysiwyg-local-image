<?php
$id = isset($_GET['id'])?$_GET['id']:null;

$data = array(
    array(
        'url' => 'images/Jellyfish.jpg',
        'title' => "Jellyfish",
        'items' => array(
            array( 'url' => 'images/Jellyfish_1.jpg', 'title' => '200x150'),
            array( 'url' => 'images/Jellyfish_2.jpg?a=1', 'title' => '300x225')
        )
    ),
    array(
        'url' => 'images/Koala.jpg',
        'title' => "Koala",
        'items' => array(
            array( 'url' => 'images/Koala_1.jpg', 'title' => '200x150'),
            array( 'url' => 'images/Koala_2.jpg?a=1', 'title' => '300x225')
        )
    )
);

if($id!=null){
    echo json_encode($data[$id]['items']);
}else{
    $list = array();

    foreach($data as $key => $row) {
        array_push($list, array(
            'id' => $key,
            'url' => $row['url'],
            'title' => $row['title']
        ));
    }

    echo json_encode($list);
}
?>