// Este es el primer archivo de prueba

/* En este archivo se verifica el funcionamiento correcto del
ciclo while, asi como la sentencia if y else */

void main() {
	String cadenaFigura = "";
	int i; 
	int n = 10;
		
	i=-3*n/2;
	// iniciando dibujo
	
	while(i<=n){
		cadenaFigura = "";
		int j; 
		j=-3*n/2;
		while(j<=3*n){
			int absolutoi;
			absolutoi = i;
			int absolutoj;
			absolutoj = j;
			if(i < 0) {
				absolutoi = i * -1;
			}
			if(j < 0) {
				absolutoj = j * -1;
			}
			if((absolutoi + absolutoj < n)
					|| ((-n / 2 - i) * (-n / 2 - i) + (n / 2 - j) * (n / 2 - j) <= n * n / 2)
					|| ((-n / 2 - i) * (-n / 2 - i) + (-n / 2 - j) * (-n / 2 - j) <= n * n / 2)) {
				cadenaFigura = cadenaFigura & "* ";
			}
			else
			{
				cadenaFigura = cadenaFigura & ". ";
			}
			j=j+1;
		}
            println(cadenaFigura);
            i=i+1;
        }
        println("Si la figura es un corazón, te aseguro que tendrás un 100 :3");
}


/*
---------------------------SALIDA ESPERADA-----------------------
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . * * * . . . . . . . * * * . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . * * * * * * * . . . * * * * * * * . . . . . . . . . . . . . . . . . . . . . . 
. . . . . * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . 
. . . . . * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . 
. . . . * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . 
. . . . * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . 
. . . * * * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . 
. . . * * * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . 
. . . * * * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . 
. . . . * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . 
. . . . * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . 
. . . . . * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . 
. . . . . * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . 
. . . . . . . * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . * * * * * . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . * * * . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . * . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 

*/
