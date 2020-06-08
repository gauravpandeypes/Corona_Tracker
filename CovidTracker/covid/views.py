from django.shortcuts import render,redirect
import requests
from covid.models import CovidAll
from datetime import datetime
# Create your views here.

def c_sort(c):
    return c['TotalConfirmed']

# Adding new Day's data
def updateData(country):
    try:
        temp = CovidAll()
        temp.country = country['Country']
        temp.code = country['CountryCode']
        tempPopulation = CovidAll.objects.filter(code__contains=country['CountryCode'])
        if(len(tempPopulation)>0):
            temp.population = tempPopulation[0].population
        temp.date = country['Date'].split("T")[0]
        temp.confirmed = country['TotalConfirmed']
        temp.deaths = country['TotalDeaths']
        temp.recovered = country['TotalRecovered']
        tempActive = (int(country['TotalConfirmed'])-(int(country['TotalDeaths'])+int(country['TotalRecovered'])))
        temp.active = tempActive if tempActive>-1 else 0
        temp.new_confirmed = country['NewConfirmed']
        temp.new_deaths = country['NewDeaths']
        temp.new_recovered = country['NewRecovered']
        temp.save()
    except Exception as e:
        print(e)

# Updating new Day's data
def updateLatestData(temp,country):
    try:
        temp.confirmed = country['TotalConfirmed']
        temp.deaths = country['TotalDeaths']
        temp.recovered = country['TotalRecovered']
        tempActive = (int(country['TotalConfirmed'])-(int(country['TotalDeaths'])+int(country['TotalRecovered'])))
        temp.active = tempActive if tempActive>-1 else 0
        temp.new_confirmed = country['NewConfirmed']
        temp.new_deaths = country['NewDeaths']
        temp.new_recovered = country['NewRecovered']
        temp.save()
    except Exception as e:
        print(e)

def checkAndUpdate(apiDate,tempDate,countries):
    now = datetime.now()
    nowDate,nowTime = str(now).split(" ")
    print("nowDate =" ,nowDate, "nowTime =",nowTime)
    if((nowTime>='15:00:00' and nowTime<='15:05:00') or (nowTime>='03:00:00' and nowTime<='03:05:00')):
        if(apiDate>tempDate):
            print('Adding new Data')
            for i in range(len(countries)):
                print(countries[i]['Country'],end=' ')
                updateData(countries[i])
            print('Update successful')
        # elif(apiDate==tempDate):
        #     print('Updating today\'s data')
        #     for i in range(len(countries)):
        #         temp = CovidAll.objects.filter(code__contains=countries[i]['CountryCode']).order_by('-date')
        #         updateLatestData(temp[0],countries[i])
        #     print('Update successful')

def index(request):
    country = CovidAll.objects.filter(code__contains='US').order_by('-date')
    country = country[0];
    tempDate = str(country.date)
    print(tempDate)
    res = requests.get("https://api.covid19api.com/summary")
    res = res.json()
    world = res['Global']
    countries = res['Countries']
    apiDate = countries[0]['Date'].split("T")[0]
    print(apiDate)

    checkAndUpdate(apiDate,tempDate,countries)
    countries = sorted(countries, key=lambda k:k['TotalConfirmed'], reverse=True)

    date = res['Date']
    return render(request,'covid/index.html',{'world':world,'countries':countries,'date':date,'country':country})

def indianStates(request):
    res = requests.get("https://api.covid19india.org/data.json")
    res = res.json()
    ind = res['statewise']
    total = ind[0]
    date = ind[0]['lastupdatedtime']
    del ind[0]
    # states = dict()
    # for state in ind:
    #     states[state['state']]=state
    return render(request,'covid/indianStates.html',{'states':ind,'total':total,'date':date})

def addData(country,code,population,covidall):
    temp = CovidAll()
    temp.country = country
    temp.code = code
    temp.population = population
    temp.date = covidall['date']
    temp.confirmed = covidall['confirmed']
    temp.deaths = covidall['deaths']
    temp.recovered = covidall['recovered']
    temp.active = covidall['active']
    temp.new_confirmed = covidall['new_confirmed']
    temp.new_deaths = covidall['new_deaths']
    temp.new_recovered = covidall['new_recovered']
    return temp

def createCountryStatus(request):
    CovidAll.objects.all().delete()
    res = requests.get("https://corona-api.com/countries")
    res = res.json()
    data = res['data']
    i=0
    for co in data:
        temp = requests.get("https://corona-api.com/countries/"+co['code'])
        temp = temp.json()
        # covidData = addData(co['name'],co['code'],co['population'],temp['data']['timeline'])
        # covidData.save()
        # if(i<20):
        print(co['name'],co['code'],co['population'], end=' ')
            # i=i+1
        if(temp['data']['timeline']):
            for covidall in temp['data']['timeline']:
                covidData = addData(co['name'],co['code'],co['population'],covidall)
                covidData.save()
        # for country in temp['data']['timeline']:
        #     if(temp['data']['timeline'][country]):
        #         covidallData = temp['data']['timeline'][country]
        #         for covidall in covidallData:
        #             covidData = addData(co['name'],co['code'],co['population'],covidall)
        #             covidData.save()
    return redirect("covid_index")

def otherCountry(request,code):
    country = CovidAll.objects.filter(code__contains=code).order_by('-date')
    countryName = country[0].country

    return render(request,'covid/otherCountry.html',{'country':country,'countryName':countryName})
