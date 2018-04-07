 
class Main {
    constructor (data,filters){
        this.data = data
        this.count = 1
        this.已中奖 = []
        this.filters = filters
    }
    do(x){
        let filters = this.filters
        let max = -1
        let last = 0
        let score
        let data = this.data
        if(x && !!~data.indexOf(x)){
            data.splice(data.indexOf(x),1)
            return x;
        }
        data.forEach((v,i) => {
            if(filters.indexOf(v) > -1){
                score = -1
            }else{
                score = Math.random()*10000
            }
            score > max && (max = score,last = i)
        })
        let rz = data[last]

        
         
        this.已中奖.push(rz)
        this.count++
        data.splice(last,1)
        
        return rz
    }
    getAll(){
        return this.data
    }
}


module.exports = Main