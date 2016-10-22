secondCount = 1
while True:

        # process Interrupts from Lightning

        if (as3935Interrupt == True):

                try:
                        process_as3935_interrupt()


                except:
                        print "exception - as3935 I2C did not work"


        if (config.TCA9545_I2CMux_Present):
                tca9545.write_control_register(TCA9545_CONFIG_BUS0)
        # process commands from RasPiConnect
        print "---------------------------------------- "

        processCommand()

        if ((secondCount % 10) == 0):
                # print every 10 seconds
                sampleAndDisplay()
                patTheDog()      # reset the WatchDog Timer
                blinkSunAirLED2X(2)




        # every 5 minutes, push data to mysql and check for shutdown


        if ((secondCount % (5*60)) == 0):
                # print every 300 seconds
                sampleWeather()
                sampleSunAirPlus()
                writeWeatherRecord()
                writePowerRecord()

                if (batteryVoltage &lt; 3.5): print "---&gt;&gt;&gt;&gt;Time to Shutdown&lt;&lt;&lt;&lt;---"
                        shutdownPi("low voltage shutdown")


        # every 15 minutes, build new graphs

        if ((secondCount % (15*60)) == 0):
                # print every 900 seconds
                sampleWeather()
                sampleSunAirPlus()
                doAllGraphs.doAllGraphs()

        # every 30 minutes, check wifi connections

        if ((secondCount % (30*60)) == 0):
                # print every 900 seconds
                WLAN_check()

        #WLAN_check()


        # every 48 hours, reboot
        if ((secondCount % (60*60*48)) == 0):
                # reboot every 48() hours seconds
                rebootPi("48 hour reboot")


        secondCount = secondCount + 1
        # reset secondCount to prevent overflow forever

        if (secondCount == 1000001):
                secondCount = 1

        time.sleep(1.0)
