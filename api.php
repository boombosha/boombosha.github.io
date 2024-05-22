<?php

enum ErrorCode
{
	case InputParams;
	case UnknownMethod;
	case Query;
};

class MyException extends Exception {
    function __construct($message, private ErrorCode $case){
        match($case){
            ErrorCode::InputParams      =>    parent::__construct($message, 1),
            ErrorCode::UnknownMethod    =>    parent::__construct($message, 2),
            ErrorCode::Query            =>    parent::__construct($message, 3)
        };
    }
}

class Messages
{
	public function getList($offset, $count)
	{
		if (!(is_numeric($offset) && is_numeric($count)))
			throw new MyException('Некорректный тип входных параметров', ErrorCode::InputParams);
		
		$offset = ceil($offset);
		$count = ceil($count);
		
		$result = $this->db->query("SELECT * FROM `messages` LIMIT $offset, $count");
		
		if (!$result)
			throw new MyException('Не удалось выполнить запрос к БД', ErrorCode::Query);
		
		for ($i = 0; $row = $result->fetch_assoc(); ++$i) {
			$row['author'] = htmlspecialchars_decode($row['author']);
			$row['content'] = htmlspecialchars_decode($row['content']);
			$array[$i] = $row;
		}
		
		return $array;
	}
	
	public function get($id)
	{
		if (!is_numeric($id))
			throw new MyException('Некорректный тип входных параметров', ErrorCode::InputParams);
		
		$id = ceil($id);
		
		$result = $this->db->query("SELECT * FROM `messages` where `id` = $id");
		
		if (!$result)
			throw new MyException('Не удалось выполнить запрос к БД', ErrorCode::Query);
		
		$row = $result->fetch_assoc();
		
		$row['author'] = htmlspecialchars_decode($row['author']);
		$row['content'] = htmlspecialchars_decode($row['content']);
		
		return $row;
	}
	
	public function add($author, $content)
	{
		$author = htmlspecialchars($author);
		$author = $this->db->real_escape_string($author);
		
		$content = htmlspecialchars($content);
		$content = $this->db->real_escape_string($content);
		
		$result = $this->db->query("INSERT INTO `messages` (`author`, `content`) VALUES ('$author', '$content')");
		
		if (!$result)
			throw new MyException('Не удалось выполнить запрос к БД', ErrorCode::Query);
	}
	
	public function edit($id, $content)
	{
		if (!is_numeric($id))
			throw new MyException('Некорректный тип входных параметров', ErrorCode::InputParams);
		
		$id = ceil($id);
		
		$content = htmlspecialchars($content);
		$content = $this->db->real_escape_string($content);
		
		$result = $this->db->query("UPDATE `messages` SET `content` = '$content' WHERE `id` = $id");
		
		if (!$result)
			throw new MyException('Не удалось выполнить запрос к БД', ErrorCode::Query);
	}
	
	public function remove($id)
	{
		if (!is_numeric($id))
			throw new MyException('Некорректный тип входных параметров', ErrorCode::InputParams);
		
		$id = ceil($id);
		
		$result = $this->db->query("DELETE FROM `messages` WHERE `id` = $id");
		
		if (!$result)
			throw new MyException('Не удалось выполнить запрос к БД', ErrorCode::Query);
	}
	
	public function getLikes($id)
	{
		if (!is_numeric($id))
			throw new MyException('Некорректный тип входных параметров', ErrorCode::InputParams);
		
		$id = ceil($id);
		
		$result = $this->db->query("SELECT `likes` FROM `messages` WHERE `id` = $id");
		
		if (!$result)
			throw new MyException('Не удалось выполнить запрос к БД', ErrorCode::Query);
		
		$row = $result->fetch_assoc();
		
		return $row['likes'];
	}
	
	public function addLike($id)
	{
		if (!is_numeric($id))
			throw new MyException('Некорректный тип входных параметров', ErrorCode::InputParams);
		
		$id = ceil($id);
		
		$result = $this->db->query("UPDATE `messages` SET `likes` = `likes` + 1 WHERE `id` = $id");
		
		if (!$result)
			throw new MyException('Не удалось выполнить запрос к БД', ErrorCode::Query);
	}
	
	public function setDbConnection(mysqli $db) {
		$this->db = $db;
	}
	
	private $db;
}

function processMessagesAction($action)
{
	try {
		$mysqli = new mysqli('localhost', 'root', '', 'guest_book');
		$messages = new Messages();
		$messages->setDbConnection($mysqli);
		$response = 'OK';
		
		switch ($action) {
			case 'getList';
				if (isset($_POST['offset']) && isset($_POST['count'])) {
					$result = $messages->getList($_POST['offset'], $_POST['count']);
					$response = ['messages' => $result];
				}
				break;
			case 'get';
				if (isset($_POST['id'])) {
					$result = $messages->get($_POST['id']);
					$response = ['message' => $result];
				}
				break;
			case 'add';
				if (isset($_POST['author']) && isset($_POST['content']))
					$messages->add($_POST['author'], $_POST['content']);
				break;
			case 'edit';
				if (isset($_POST['id']) && isset($_POST['content']))
					$messages->edit($_POST['id'], $_POST['content']);
				break;
			case 'remove';
				if (isset($_POST['id']))
					$messages->remove($_POST['id']);
				break;
			case 'getLikes';
				if (isset($_POST['id'])) {
					$result = $messages->getLikes($_POST['id']);
					$response = [
						'message' => [
							'id' => $_POST['id'],
							'likes' => $result
						]
					];
				}
				break;
			case 'addLike';
				if (isset($_POST['id']))
					$messages->addLike($_POST['id']);
				break;
			default:
				throw new MyException('Неизвестный метод или набор параметров', ErrorCode::UnknownMethod);
		}
		
		echo json_encode(['response' => $response]);
	}
	catch (MyException $e) {
		$error = ['code' => $e->getCode(), 'message' => $e->getMessage()];
		echo json_encode(['error' => $error]);
	}
}

if (!(isset($_POST['method']) && isset($_POST['action']))) {
	include 'api.html';
	exit;
}

$method = $_POST['method'];
$action = $_POST['action'];

switch ($method) {
	case 'messages';
		processMessagesAction($action);
		break;
}

?>