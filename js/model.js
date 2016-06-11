define(
    'model',
    ['jquery'],function(){

                 return {model: model = function  (data){//хранение данных
                    
                    var self = this; //сохраняем this поскольку это конструктор класса, 
                    //чтобы мы работали строго в контексте экземпляра класса Model, который потом создадим
                    
                    self.data = data;
                    
                    self.addItem = function(item) {
                        
                        if(item.length === 0){
                            return;// т.е. если длинна item равна нулю символов, то мы ничего не делаем 
                        }
                       
                     self.data.push(item);//добавляем новые данные
                     
                     
                     return self.data; //возвращаем обновленные данные  
                        
                    };
                    
                    self.removeItem = function(item) {
                        
                        if(item.length === -1){
                            return;// если мы не нашли совпадений -1 то ничего не делаем
                        }
                      
                      var index = self.data.indexOf(item);// через indexOf будем искать совпадающий item 
                      //и если найдем совпадение вермнем индекс этого элемента
                      
                      self.data.splice(index,1);
                      // потом с помощью splice ищем элемент с заданным индексом удаляем его и сдвигаем массив на 1 элемент
                      
                      return self.data;
                                            
                    };
    
            }
};
});