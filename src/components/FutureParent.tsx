import React, { useEffect, useState } from "react";
import axios from "axios";
import Launch from "./Launch";
import localforage from "localforage";

const FutureParent: React.FC = () => {
  const [data, setData] = useState([]);
  const [lastUpdate, setDate] = useState("");

  useEffect(() => {
    if (typeof localforage != "undefined") {
      console.log("Working"); // pass test

      localforage
        .getItem("dataFutureDate")
        .then(function (date : any) {
          
          if (date == null) {
            console.log("No date")
            getAllLaunches(
              "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=100"
            );
          } else {
            //console.log(date)
            localforage
            .getItem("dataFuture")
            .then(function (data: any) {
              // This code runs once the value has been loaded
              // from the offline store.
              if (data == null) {
                console.log("No data")
                getAllLaunches(
                  "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=100"
                );
              } else {
               // console.log(date,new Date(),Math.abs(date - new Date()))
                if (Math.abs(date.getTime() - new Date().getTime()) > 30 * 60 * 1000) {
                  console.log("too long")
                  getAllLaunches(
                    "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=100"
                  );
                } else {
                  console.log("got saved data")
                  setData(data);
                  setDate(date)
                }
                
              }
            })
            .catch(function (err: any) {
              // This code runs if there were any errors
              console.log(err);
            });       
          }        
        })
        .catch(function (err: any) {
          // This code runs if there were any errors
          console.log(err);
        });
    } else {
      // error with local forage
    }
  }, []);

  const getAllLaunches = (url: string) => {
    console.log("hey....api contacted")
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setData(response.data.results);

        localforage
          .setItem("dataFuture", response.data.results)
          .then(function (value: any) {
            // Do other things once the value has been saved.
            console.log(value);
          })
          .catch(function (err: any) {
            // This code runs if there were any errors
            console.log(err);
          });

        localforage
          .setItem("dataFutureDate", new Date())
          .then(function (value: any) {
            setDate(value)
            // Do other things once the value has been saved.
            console.log(value);
          })
          .catch(function (err: any) {
            // This code runs if there were any errors
            console.log(err);
          });
      })
      .catch((error) => {
        console.log("Error of type", error.message, "occurred");
        alert(`Error! An ${error.message} occurred.`);
      });
  };

  return <Launch launches={data} date={lastUpdate} />;
};

export default FutureParent;