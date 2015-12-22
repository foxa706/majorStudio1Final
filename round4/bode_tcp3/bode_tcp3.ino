#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>

#define PORT 255
YunServer server(PORT);
YunClient client;

static boolean clientActive = false;

String inString = "";

void setup()
{
  // Bridge startup
  Bridge.begin();
 
  server.noListenOnLocalhost();
  server.begin();
  client = server.accept();
}



void loop()
{
  if (client.connected())
  {
    if (!clientActive)
      Serial.println("New client connection.");
     
    clientActive = true;
   
    // Have a connection. Read and echo any input to the serial port
    if (client.available())
    {
      Serial.print("Reading weather: \"");
     
      while (client.available())
        Serial.print((char)client.read());
        Serial.println("\"");
//        int inChar = (char)client.read();
//        if (isDigit(inChar)) {
//          inString += (char)inChar;
//        }      
//        Serial.print("Weather Reading: ");
//        Serial.println(inString);
    }
   
    // Send to the client
    client.println("accessing weather");
  } else // No connection, try to accept one.
  {
    if (clientActive)
    {
//      delay(5000);
      client.stop();
      Serial.println("Bode disconnected.");
    }
     
    clientActive = false;
   
    client = server.accept();
  }
}


