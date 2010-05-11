/*global $, $$, Class, Options, Events, Element */

var Faq = new Class({
    Implements: [Options, Events],
    options: {
        'answers': '.faq-answer',
        'questions': '.faq-question',
        'expand': '.faq-expand',
        'collapse': '.faq-collapse',
        'expandClass': 'expand',
        'collapseClass': 'collapse'
    },
    initialize: function(element, options){
        this.element = document.id(element);
        this.setOptions(options);
        
        this.answers = this.element.getElements(this.options.answers);
        this.questions = this.element.getElements(this.options.questions);
        
        this.questions.addEvent('click', this.toggleEventHandler.bind(this));
        this.element.getElements(this.options.expand).addEvent('click', this.expandEventHandler.bind(this));
        this.element.getElements(this.options.collapse).addEvent('click', this.collapseEventHandler.bind(this));
    },
    toggle: function(faq, expand){
        if(expand !== true && expand !==false){
            expand = !faq.hasClass(this.options.expandClass);
        }
        if(expand){
            faq.addClass(this.options.expandClass);
            faq.removeClass(this.options.collapseClass);
        }
        else {
            faq.addClass(this.options.collapseClass);
            faq.removeClass(this.options.expandClass);
        }
    },
    expand: function(faq){
        this.toggle(faq, true);
        // recursively expand descendant faq-answers
        faq.getElements(this.options.answers).each(function(item, index, array){
            this.expand(item);
        }.bind(this));
    },
    collapse: function(faq){
        this.toggle(faq, false);
        // recursively collapse descendant faq-answers
        faq.getElements(this.options.answers).each(function(item, index, array){
            this.collapse(item);
        }.bind(this));
    },
    expandEventHandler: function(event){
        event.preventDefault();
        var target = $(event.target.href.match(/#(.*)/)[1]);
        this.expand(target);
    },
    collapseEventHandler: function(event){
        event.preventDefault();
        this.collapse(this.element);
    },
    toggleEventHandler: function(event){
        event.preventDefault();
        var target = $(event.target.href.match(/#(.*)/)[1]);
        this.toggle(target);
    },
    toElement:function(){
        return this.element;
    }
});


Element.implement({
    faq: function(options){
        return this.store('faq', new Faq(this, options));
    }
});
