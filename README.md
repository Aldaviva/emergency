# emergency
Turn on a spinning red light when a dire situation arises, like a build breaking.

## Installing

1. `npm install emergency`
2. `cp config.example.json config.json`
3. `nano config.json` (see [Configuration](#configuration) below)

## Running

1. `sudo node .`

## Configuration

- **checkFrequency** how long to wait between polling a job, in milliseconds
- **cooldownTimeout** how long to wait to turn off the light automatically after it turns on (if a successful build doesn't turn it off first), in milliseconds
- **gpio.pin** [physical pin number](http://developer-blog.net/wp-content/uploads/2013/09/raspberry-pi-rev2-gpio-pinout.jpg) of the output pin connected to the + in terminal on your relay
- **jobs[].name** descriptive name of a job, used in logging
- **jobs[].url** URL of your Jenkins job, looks like `http://build.corp.com/job/mybuild`, and will have `/lastBuild/api/json` appended to check the build status

## Recommended Hardware

- [Raspberry Pi Model B Rev. 2](http://www.amazon.com/gp/product/B009SQQF9C) or newer
- [PowerSwitch Tail II](http://www.powerswitchtail.com/Pages/default.aspx)
- [Red DJ Lighting Rave Club Stage Effect Light Beacon](http://www.ebay.com/itm/200732317167)
