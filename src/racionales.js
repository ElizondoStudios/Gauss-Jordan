export class racionales{
    primos=[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31,
         37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79,
         83, 89, 97, 101, 103, 107, 109, 113, 127, 131,
         137, 139, 149, 151, 157, 163, 167, 173, 179, 181,
         191, 193, 197, 199, 211, 223, 227, 229, 233, 227,
         229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 
         281, 283, 293, 307, 311, 313, 317, 331, 337, 347,
         349, 353, 359, 367, 373, 379, 383, 389, 397, 401,
         409, 419, 421, 431, 433, 439, 443, 449, 457, 461,
         463, 467, 479, 487, 491, 499, 503, 509, 521, 523,
         541, 547, 557, 563, 569, 571, 577, 587, 593, 599,
         601, 607, 613, 617, 619, 631, 641, 643, 647, 653,
         659, 661, 673, 677, 683, 691, 701, 709, 719, 727,
         733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
         809, 811, 821, 823, 827, 829, 839, 853, 857, 859,
         863, 877, 881, 883, 887, 907, 911, 919, 929, 937,
         941, 947, 953, 967, 971, 977, 983, 991, 997, 1009
        ]
    
    divisores=[]
    dato;

    constructor(dato=""){
        this.dato= dato
    }

    primerDato(){
        let barra= this.dato.indexOf("/")
        if(barra>=0) //Es razon
            return parseInt(this.dato.slice(0, barra))
        return parseInt(this.dato) //Es entero
    }

    segundoDato(){
        let barra= this.dato.indexOf("/")
        if(barra>=0) //Es razon
            return parseInt(this.dato.slice(barra+1))
        return 0 //Es entero
    }

    MCD(dividendo, divisor, indxPrimos){
        // Caso base 
        if(dividendo<this.primos[indxPrimos] || divisor<this.primos[indxPrimos] || this.primos[indxPrimos]===1009){
            let resultado=1;
            this.divisores.forEach(e => resultado*=e)
            return resultado
        }
        
        // Si es divisor 
        if(dividendo%this.primos[indxPrimos]==0 && divisor%this.primos[indxPrimos]==0 ){
            this.divisores.push(this.primos[indxPrimos])
            return this.MCD((dividendo/this.primos[indxPrimos]), (divisor/this.primos[indxPrimos]), indxPrimos)
        }else{ 
            //Si no es divisor
            return this.MCD(dividendo, divisor, indxPrimos+1)
        }
    }

    simplificar(numerador, denominador){
        // El denominador es 1
        if(denominador==1)
            return numerador
        //El numerador es 0
        if(numerador==0)
            return "0"

        //Es una fracción normal
        this.divisores=[];
        let numAbs=numerador, denAbs=denominador
        if(numAbs<0)
            numAbs*=-1;
        if(denAbs<0)
            denAbs*=-1;
        let comunDiv= this.MCD((numAbs), (denAbs), 0) 
        
        //Cambia los signos al ser negativos
        if(denominador<0){
            denominador*=-1
            numerador*=-1
        }

        //Retornar solo el numerador si el denominador es 1
        if(denominador/comunDiv === 1)
            return ""+(numerador/comunDiv)
        

        //Retornar la fracción simplificada
        return (numerador/comunDiv)+"/"+(denominador/comunDiv)
    }

    sumar(frac){
        let a= this.primerDato()
        let b= this.segundoDato()
        let c= frac.primerDato()
        let d= frac.segundoDato()

        //ambos son enteros
        if(!b && !d)
            return ""+(a+c)

        if(!b) //el primer termino es entero
            b=1

        if(!d) //el segundo termino es entero
            d=1

        // Reducir la fraccion
        return this.simplificar((a*d+b*c), (b*d))
    }

    restar(frac){
        let a= this.primerDato()
        let b= this.segundoDato()
        let c= frac.primerDato()
        let d= frac.segundoDato()

        //ambos son enteros
        if(!b && !d)
            return ""+(a-c)

        if(!b) //el primer termino es entero
            b=1

        if(!d) //el segundo termino es entero
            d=1

        // Reducir la fraccion
        return this.simplificar((a*d-b*c), (b*d))
    }

    multiplicar(frac){
        let a= this.primerDato()
        let b= this.segundoDato()
        let c= frac.primerDato()
        let d=frac.segundoDato()

        if(!b && !d) //ambos son enteros
            return ""+(a*c)
        
        if(!b) //el primer termino es entero
            b=1

        if(!d) //el segundo termino es entero
            d=1

        // Reducir la fraccion
        return this.simplificar((a*c), (b*d))
    }

    dividir(frac){
        let a= this.primerDato()
        let b= this.segundoDato()
        let c= frac.primerDato()
        let d=frac.segundoDato()

        if(!b && !d){
            //ambos son enteros
            return this.simplificar(a, c)
        } 

        if(!b) //el primer termino es entero
            b=1

        if(!d) //el segundo termino es entero
            d=1

        // Reducir la fraccion
        return this.simplificar((a*d), (b*c))
    }
}

