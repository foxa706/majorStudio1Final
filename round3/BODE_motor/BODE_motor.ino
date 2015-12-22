/* 
 for demo purposes:
This motor code is based off the test sketchs for the Adafruit's Motor Shield
to do:
high rain high temp
high rain low temp
low rain high temp
low rain low temp
*/

#include <AccelStepper.h>
#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include "utility/Adafruit_PWMServoDriver.h"

// Create the motor shield object
Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 

// using motor port # 1 (M1 and M2) & #2 (M3 and M4)
Adafruit_StepperMotor *stepper1 = AFMS.getStepper(200, 1);
Adafruit_StepperMotor *stepper2 = AFMS.getStepper(200, 2);

const int buttonPin = 10;
int storedState = 0;
int buttonState = 0; 

// wrappers for the motors!
void forwardstep1() {  
  stepper1->onestep(FORWARD, DOUBLE);
}
void backwardstep1() {  
  stepper1->onestep(BACKWARD, DOUBLE);
}
void forwardstep2() {  
  stepper2->onestep(FORWARD, DOUBLE);
}
void backwardstep2() {  
  stepper2->onestep(BACKWARD, DOUBLE);
}

// Wrap the 2 steppers in an AccelStepper objects
AccelStepper step1(forwardstep1, backwardstep1);//small charm
AccelStepper step2(forwardstep2, backwardstep2);//large charm

void setup() {
  Serial.begin(9600);           //to do: address the serial rate for duino vs wifi
  Serial.println("Hello BODE!");
  
  pinMode(buttonPin, INPUT);
  AFMS.begin();  //Start the shield
  

  step1.setMaxSpeed(150.0);
  step1.setAcceleration(100.0);
//  step1.moveTo(2000);//low of -13000, high of 13000
   
  step2.setMaxSpeed(150.0);
  step2.setAcceleration(100.0);
//  step2.moveTo(-7000);
  while (digitalRead(buttonPin) == LOW) {}
}

void loop() {
  
  step1.moveTo(-7000);//step 1 is pos pull up , neg let down
  step2.moveTo(4500);//step 2 is neg pull up , pos let down
  
    step1.run();
    step2.run();
    
}
