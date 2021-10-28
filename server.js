const express=require('express');
const axios= require('axios');
const ejs=require('ejs');
const app = express();

//app.use(express.static('public'));
app.set('view engine',ejs);
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.render('index.ejs', {CountryData:''});
});

app.post('/DataCountry', (req,res)=>{
   
    let country;
        if (req.body.optionCountry === "EST") {
            country = "estonia";
           
        }else if (req.body.optionCountry === "LV") {
            country = "latvia";
        } else {
            country = "lithuania"
        }
   
    const url='https://restcountries.com/v3/name/'+country;

    axios.get(url)
    .then((response)=>{
        let Country = {
            name: '',
            Domain: '',
            CallingCode: '',
            Capital: '',
            Region:'',
            Subregion:'',
            population: '',
            Timezone: '',
            Language: '',
            Currencyname: '',
            Currencysymbol: '',
            urlflag: ''
        };
        
        
        Country.name = response.data[0].name.common;
        Country.Domain = response.data[0].tld[0];
        Country.Capital = response.data[0].capital[0];
        Country.Region = response.data[0].region;
        Country.Subregion = response.data[0].subregion;
        Country.Timezone = response.data[0].timezones[0];
        Country.CallingCode = response.data[0].idd.root;
        Country.population = response.data[0].population;
        Country.CallingCode = response.data[0].idd.root;
        if (Country.Domain == ".lt") {
            Country.LanguageEnglish = response.data[0].languages.lit;
        }
        else if (Country.Domain == ".ee") {
            Country.LanguageEnglish = response.data[0].languages.est;
        }
        else{
            Country.LanguageEnglish = response.data[0].languages.lav;
        }
        Country.Currencyname = response.data[0].currencies.EUR.name;
        Country.Currencysymbol = response.data[0].currencies.EUR.symbol;
        Country.urlflag = response.data[0].flags[0];
        res.render('index.ejs', {CountryData: Country});

        /*let country=response.data.name;
        let codeUSD=response.data.bpi.USD.code;
        let rateEUR=response.data.bpi.EUR.rate;
        let codeEUR=response.data.bpi.EUR.code;*/

    })
    .catch((error)=>{
        console.log(error);
    });

});

/*app.post('/countryview',(req,res)=>{
    const url='https://restcountries.eu/rest/v2/name/%7Bname%7D?fullText=true';
});

 
        let userCountry = String(req.body.country);
        //let userCurrency=req.body.currency;
    
        axios.get(url)
        .then((response)=>{
    
            let countryData={
                countryName:'',
                countryLuhend:'',
                result:''
            };
            
    
             /*if(userCountry==='Est'){
                countryData.countryName = response.data.name;
               // coinData.coinCcode = response.data.bpi.EUR.code;
                //coinData.result = userCoins * coinData.coinRate;
            }
           else{
                coinData.coinRate = response.data.USD.rate_float;
                coinData.coinCcode = response.data.bpi.USD.code;
                coinData.result = userCoins * coinData.coinRate;
            }*/
    
              /*  let rateUSD=response.data.bpi.USD.rate_float;
                let result=userCoins * rateUSD;
    
            res.render('index.ejs', {bitCoinRate: coinData});
        })
        .catch((error)=>{
            console.log(error);
        });
    
    });*/

app.listen(5000, ()=> { //function()/()=>{}
    console.log('Server is running on port 5000');
});
