app.component('mega-calc', {
    template:
    /*html*/
    `<div class="calc-container">
        <!--<p> <span class="checkbox-name">Хочу конвертировать бонусы в рубли:</span>  
            <label class="checkbox style-e">
                <input type="checkbox" v-model="toggle" checked="checked"/>
                <div class="checkbox__checkmark"></div>
                <div class="checkbox__body"></div>
            </label>
        </p>
        <p v-if="toggle"> -->

            <div class="radio-container">
                <p> Без пакета услуг: <label><input type="radio" name="sber" v-model="selectedOption" :value="'withoutPackage'"></label> </p>
                <p> СберПрайм+: <label><input type="radio" name="sber" :value="'sberPrime'" v-model="selectedOption"></label> </p>          
                <p> СберПремьер: <label><input type="radio" name="sber" :value="'sberPremier'" v-model="selectedOption"></label> </p>
                <p> СберПервый: <label><input type="radio" name="sber" :value="'sberFirst'" v-model="selectedOption"></label></p>
                <p> Sber Private Banking: <label><input type="radio" name="sber" :value="'sberPrivate'" v-model="selectedOption"></label></p>
                <p> <input type="number" v-model="bonusGive" class="bonusGive" placeholder="бонусы"><img src="./assets/pic/sberspasibo.png" alt="сберспасибо" width="50" align="top"> = <span class="moneyReturn"> {{ moneyReturn }} </span> ₽</p>
            </div>    
              
            
        </p>       
        <p> Сумма заказа: <input type="number" v-model.number="orderSumm" placeholder="Сумма заказа"> руб.</p>
        <p> Обещают бонусов: <input type="number" v-model.number="bonusPromise" placeholder="Обещают бонусов"> %</p>
        <p> Промокод: <input type="number" v-model.number="promocode" placeholder="Промокод"> руб.</p>
        <p> Оплата бонусами: <input type="number" v-model.number="bonusPay" placeholder="Оплата бонусами"> <img src="./assets/pic/sberspasibo.png" alt="сберспасибо" width="50" align="top"></p>
        <div class="alert" v-show="(orderSumm-promocode)<bonusPay">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            <strong> Сумма оплаты бонусами не может превышать сумму заказа </strong>
        </div>    
        <p> Вернут бонусов: <span class="bonusBack"> {{ bonusBack }} </span> <img src="./assets/pic/sberspasibo.png" alt="сберспасибо" width="50" align="top"></p>
        <p> Спишут с карты: <span class="realPayment"> {{ realPayment }} </span> руб.</p>
        
        
        <p> Цена товара: <span class="realPrice"> {{ priceNoCashbackConv }} </span>
            <br><span class="realPriceExplanation">(если не конвертируем кэшбек) </span>  
        </p>
        
        <p> Цена товара: <span class="realPrice"> {{ priceCashbackConv }} </span>
            <br><span class="realPriceExplanation">(если конвертируем кэшбек) </span>  
        </p>

        <p> <span class="checkbox-name">Хочу конвертировать бонусы в рубли:</span>  
            <label class="checkbox style-e">
                <input type="checkbox" v-model="toggle" checked="checked"/>
                <div class="checkbox__checkmark"></div>
                <div class="checkbox__body"></div>
            </label>
        </p>
        <div v-if="toggle">
            Бонусы: <input type="number" v-model.number="bonusToConvert" placeholder="Конвертируемые бонусы"> <img src="./assets/pic/sberspasibo.png" alt="сберспасибо" width="50" align="top">
            <p> Цена товара: <span class="realPrice"> {{ priceBonusConv }} </span></p>
            <span class="realPriceExplanation"> (если конвертируем ранее накопленные бонусы) </span>  
        </div>
        
    </div>`,
    data() {
        return {
            orderSumm: '',
            promocode: '',
            bonusPromise: '',
            bonusPay: '',
            bonusGive: '',
            toggle: '',
            // withoutPackage: '',
            // sberPrime: '',
            // sberPremier: '',
            // sberFirst: '',
            // sberPrivate: '',
            selectedOption: 'withoutPackage'
        }
    },
    computed: {
        bonusBack() {
            let bonusBack = ((this.orderSumm - this.promocode - this.bonusPay) * this.bonusPromise / 100);
            return bonusBack
        },
        realPayment() {
            if ( (this.orderSumm - this.promocode - this.bonusPay) > 0 ) {
                return this.orderSumm - this.promocode - this.bonusPay
            }
            else {
                return '0'
            }
        },
        moneyReturn () {
            
            if (this.selectedOption === 'withoutPackage') {
               return this.bonusGive * 0.5 
            }
            if (this.selectedOption === 'sberPrime') {
                return this.bonusGive * 0.6
            }
            if (this.selectedOption === 'sberPremier') {
                return this.bonusGive * 0.7
            }
            if (this.selectedOption === 'sberFirst' || this.selectedOption === 'sberPrivate') {
                return this.bonusGive * 0.8
            }           
        },
        priceNoCashbackConv() {
            // return realPayment() + ( this.bonusGive - moneyReturn () )
            return (this.orderSumm - this.promocode + this.bonusPay) 
        }
       

        
    },

})