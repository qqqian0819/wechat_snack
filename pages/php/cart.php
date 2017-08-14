<?php

class Car{
	private static $ins=null;
	private $snacks = array();

	final protected function __construct() {}
    final protected function __clone() {}
    /**
     * 单例
     * @date   2017-06-03
     * @return object
     */
	public static function getIns()
	{
		if(!(self::$ins instanceof self)){
			return self::$ins=new self;
		}
		return self::$ins;

	}

	/**
	 * 创建购物车
	 * @date   2017-06-03
	 */
	public static function getCar()
	{
		if(!isset($_SESSION['cart'])||!($_SESSION['cart'] instanceof self)){
			 $_SESSION['cart'] = self::getIns();
		}
		return $_SESSION['cart'];
	} 

	public function sub($id,$price,$oldprice,$name,$number)
	{
		$item=array();
		$item['price']=$price;
		$item['oldprice']=$oldprice;
		$item['name']=$name;
		$item['number']=$number+1;
		$this->snacks[$id]=$item;
	}

	public function addNum($id,$price,$oldprice,$name)
	{
		if($this->hasItem($id)){
			$this->snacks[$id]['number']+=1;
		}else{
			$item=array();
			$item['price']=$price;
			$item['oldprice']=$oldprice;
			$item['name']=$name;
			$item['number']=1;
			$this->snacks[$id]=$item;
		}
		return $this->snacks;
	}

	/**
	 * 购物车中是否存在
	 * @date   2017-06-03
	 * @param  $id       [商品id]
	 * @return boolean   
	 */
	public function hasItem($id)
	{	
		return array_key_exists($id,$this->snacks);
	}


}


$car=Car::getCar();
var_dump($car->addNum('1',3,4,'啦啦啦'));