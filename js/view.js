define(
    
     'view',
     
   [ 'jquery'],function(){


     return {       view: view = function (model){// отображение данных
                       
                      var self = this;
                      
                     function init () {//вставка каркаса - это внутренний метод называем его function init() чтобы не экспортировать значения!!! И его нет смысла записывать в self
                        
                        var html = $('#frame-tmpl').html();
                       
                        var wrapper = tmpl(html);
                        
                        
                         $('body').append(wrapper);//будем вставлять шаблон
                         
                         
                        self.elements = {//ссылки на наши DOM элементы которые будут отвечать за 
                          input: $('.frame-tmpl__header-item-values'),//инпут необходим для считывания информации чтобы знать какое значение надо добавить в список
                          listContainer: $('.frame-tmpl__item-list'),  // это контейнер ul в который мы будем вставлять список наших задач
                         
                        };
                        self.renderList(model.data);//и рендерим для старта страницу то что есть у model при старте
                      };
                      
                      self.renderList = function(data){//доступный метод который будет доступен для вызова из вне
                       
                       var list  = tmpl($('#frame-tmpl__list-tmpl').html(), {data: data});
                       self.elements.listContainer.html(list);// то что было скомпилировано с помощью шаблонизатора мы вставляем в наш listContainer
                        
                      };
                         
                         
                          init();//вызывается всего лишь раз при инициализации
                        
                    }
            };

});