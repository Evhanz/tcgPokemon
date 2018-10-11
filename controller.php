<?php 
use Pokemon\Pokemon;
require __DIR__ . '/vendor/autoload.php';
$options = ['verify' => false];

/** Required Type **/

$type = $_POST['type'];
$name = $_POST['name'];


/** Primero obtenemos los sets de tipo standar**/

$sets_standart = Pokemon::Set()->where(['standardLegal' => 'true'])->all();

/** Se obtiene las cards **/
$response = [];



switch ($type) {

	case 'Energy':
		# code...

		foreach ($sets_standart as $key => $set) {

			$cardsFound = [];

			$temp_value  = Pokemon::Card()->where([
		  		'supertype' => 'energy', 
		  		'name' => $name,
		  		'setCode' => $set->getCode()
			])->all();

			foreach ($temp_value as $item) {
			    $temp = $item->toArray();
		        $temp['imgSet'] = $set->getSymbolUrl();

		        if( !in_array($item->getName(), $cardsFound) ){
                    $cardsFound[] = $item->getName();
                    $response[] = $temp;
		        }
			}
		}

		break;
	case 'Trainer':
		# code...

		foreach ($sets_standart as $key => $set) {

			$cardsFound = [];

			$temp_value  = Pokemon::Card()->where([
		  		'supertype' => 'trainer', 
		  		'name' => $name,
		  		'setCode' => $set->getCode()
			])->all();

			foreach ($temp_value as $item) {
			    $temp = $item->toArray();
		        $temp['imgSet'] = $set->getSymbolUrl();

		        if( !in_array($item->getName(), $cardsFound) ){
                    $cardsFound[] = $item->getName();
                    $response[] = $temp;
		        }
			}
		}

		break;
	
	default:

		foreach ($sets_standart as $key => $set) {
			$temp_value  = Pokemon::Card()->where([
		  		'supertype' => 'pokemon', 
		  		'name' => $name,
		  		'setCode' => $set->getCode()
			])->all();

			foreach ($temp_value as $item) {
			    $temp = $item->toArray();
		        $temp['imgSet'] = $set->getSymbolUrl();
				$response[] = $temp;
			}
		}

		# code...
		break;
}



echo json_encode($response);
