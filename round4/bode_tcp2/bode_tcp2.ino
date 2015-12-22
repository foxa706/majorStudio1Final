#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>

#define PORT 255
YunServer server(PORT);
YunClient client;

static boolean clientActive = false;

String inString1 = ""; 
String inString2 = "";   

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
     
      while (client.available() > 0 ){
        int inChar = client.read();
        for (int i = 0; i< 6; i++ ){
          if (isDigit(inChar)) {
      // convert the incoming byte to a char
      // and add it to the string:
         inString1 += (char)inChar;
//         inString2 += (char)inChar;
          }
         }
         Serial.print("incoming:");
         Serial.println(inString1);
         int report = inString1.toInt();
         Serial.print("string 1 int:");
         Serial.println(report);
     // clear the string for new input:
  //     inString = "";
       }
//       Serial.print("final num:");
//       Serial.println(report);
    }
   
    // Send to the client
    client.println("accessing weather");
  } else // No connection, try to accept one.
  {
    if (clientActive)
    {
      client.stop();
      Serial.println("Bode disconnected.");
    }
     
    clientActive = false;
   
    client = server.accept();
  }
  
}

