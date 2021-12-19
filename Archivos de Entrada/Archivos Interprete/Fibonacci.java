int fibonacci(int num){
        if(num == 0){
        	return 0;
        }
        else if (num == 1){
        	return 1;
        }
        else{
        	return fibonacci(num - 1) + fibonacci(num - 2);
        }
}	 
void main(){ 
    println("*****FIBONACCI*****");
   	print(string(fibonacci(0))&", ");
    print(string(fibonacci(1))&", ");
    print(string(fibonacci(2))&", ");
    print(string(fibonacci(3))&", ");
    print(string(fibonacci(4))&", ");
    print(string(fibonacci(5))&", ");
    print(string(fibonacci(6))&", ");
    print(string(fibonacci(7))&", ");
    print(string(fibonacci(8))&", ");
    print(string(fibonacci(9))&", ");
	print(string(fibonacci(10)));
}