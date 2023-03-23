from colorama import Cursor
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import TimeoutException

from selenium.webdriver.common.keys import Keys

import wget
import os
import pickle
import time
import sys

def lanzarChrome():
      #intalamos los drivers
      ruta= ChromeDriverManager(path=("./FirefoxDriver")).install()
      options = Options()
      #obtenemos el user-agent
      userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
      #se lo ponemos al bot
      options.add_argument(f"user-agent={userAgent}")
      #elejimos como queremos la ventana
      options.add_argument("--window-size=970,1080")
      #pasamos los argumentos para que funcione el bot
      options.add_argument("--disable-web-seciruty")
      options.add_argument("--disable-notifications")
      options.add_argument("--ignore-certificate-errors")
      options.add_argument("--no-sandbox")
      options.add_argument("--log-level=3")
      options.add_argument("--allow-running-insecure-content")
      options.add_argument("--no-default-browser-check")
      options.add_argument("--no-first-run")
      options.add_argument("--no-proxy-server")
      options.add_argument("--disable-blink-features=AutomationControlled")
      exp_opt=[
            "ignore-certificate-errors",
            "enable-logging",
      ]
      options.add_experimental_option("excludeSwitches", exp_opt)


      prefs={
            "profile.default_content_settings_values.notifications": 2,
            "intl.accept_languages":["es-ES","es"],
            "credentials_enable_service":False
      }
      options.add_experimental_option("prefs", prefs)


      s = Service(ruta)
      driver = webdriver.Chrome(service=s,options=options)
      driver.set_window_position(0,0)
      return driver

def login_instagram(): 
      #entramos a instagram y le doy iniciar por facebook
      driver.get("https://www.instagram.com")      
      wait.until(ec.visibility_of_element_located((By.CSS_SELECTOR,"span.KPnG0")))
      elemento=driver.find_element(By.CSS_SELECTOR,"span.KPnG0")
      elemento.click()      
      #En cuanto cargue le doy los datos de inicio de sesion a FB y click en entrar
      try:
            wait.until(ec.visibility_of_element_located((By.NAME,"email")))
      except TimeoutException:
            return "No salio man "
      email=driver.find_element(By.NAME,"email")
      email.send_keys("kullrichz_i449b@bylup.com")      
      wait.until(ec.visibility_of_element_located((By.NAME,"pass")))
      pas=driver.find_element(By.NAME,"pass")
      pas.send_keys("GALIADAME50")      
      inicio=driver.find_element(By.ID,"loginbutton")
      inicio.click()         

def descarga(bus="instagram", min=50):
      #En el  buscador escribo #labusqueda y le doy en  buscar    
      driver.get(f"https://www.instagram.com/explore/tags/{bus}/")
      #HACER SCROLL
      elemento = driver.find_element(By.CSS_SELECTOR,"html")
      url_fotos=set()
      while len(url_fotos) < min:
            time.sleep(3)
            #elemento.send_keys(Keys.PAGE_DOWN) 
            driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
            photos=driver.find_elements(By.CSS_SELECTOR,"img._aagt")
            for fot in photos:
                  try:
                        url=fot.get_attribute("src")
                        url_fotos.add(url)          
                  except:
                        pass        
            if len(photos) != 0:
                  print(len(photos))            
      #EMPEZAMOS CON LA DESCARGA
      if not os.path.exists(bus):
            os.mkdir(bus)
      n=0
      for url in url_fotos:
            n+=1
            print(f'descargando {n} de {len(url_fotos)}')
            nombre=wget.download(url,bus)
            print(f'\33[K     descargando...{nombre}')
      return len(url_fotos)




if __name__=='__main__':
      bus=input("Ingresa la busqueda: ")
      num=int(input("Num de  fotos va a llevar: "))
      bus=bus.replace(" ","")      
      driver = lanzarChrome()     
      wait=WebDriverWait(driver,10) 
      res=login_instagram()
"""       if res=="No salio man ":
            input("Presiona enter pasa salir")      
            driver.quit()
            sys.exit(1)
      time.sleep(10) """
      #wait.until(ec.visibility_of_element_located((By.CSS_SELECTOR,"div._aato _ab1k _ab1l")))
      ##re=descarga(bus, num)
      ##print(f'\n\nSe han descargado {re} fotos\n')
      #input("Presiona enter pasa salir")
      ##driver.quit()

