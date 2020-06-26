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

print('Database creation Started')
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
print('Database Creation successful')