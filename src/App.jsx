import React, { useState } from 'react'
import { rawTrainsData } from './TrainData'
const App = () => {

  const [selectDate, setSelectDate] = useState("");
  const [trainData, settrainData] = useState(rawTrainsData)
  const [selectedTrain, setSelectedTrain] = useState(null)


  const handleDate = (e) => {
    setSelectDate(e.target.value)
  }

  const trainForSelectDate = trainData.filter((train) => (
    train.date === selectDate
  ));


  const handleSeatBooking = (trainId, seatIndex) => {
    settrainData((prevData) =>
      prevData.map((train) => {
        if (train.trainId === trainId) {
          const updatedSeats = train.seats.map((seat, index) => {
            if (index === seatIndex && !seat.isBooked && !seat.isPWD) {
              return { ...seat, isBooked: true }; // Book only available non-PWD seats
            }
            return seat;
          });
          return {
            ...train,
            seats: updatedSeats,
            availableSeats: train.availableSeats - 1,
          };
        }
        return train;
      })
    );
  };
  return (
    <>
      <h1 className='bg-rose-400 text-white text-xl p-2 font-semibold'>Train Seat Booking System - Working solution</h1>
      <label htmlFor="data" className='text-xl text-red-500 '>Select Date :</label>
      <input type="date" name="" id="date" onChange={handleDate} />

      {
        selectDate && (
          <div>
            <h3 className=' text-xl'>Trains Available on {selectDate}</h3>
            <ul>
              {trainForSelectDate.length === 0 ? (
                <p className='text-xl my-2 font-semibold'>No train Available on this date {selectDate}</p>
              ) :
                (
                  trainForSelectDate.map((train) => (
                    <li key={train.trainId} className='text-xl'>
                      <span>{train.name} - Available Seats : {train.availableSeats} </span>
                      <button className="border-2 transition-all duration-200 hover:border-1 hover:border-blue-400 px-3 py-1 rounded-sm my-1" onClick={() => setSelectedTrain(train.trainId)}>View Seats</button>
                    </li>
                  ))
                )}
            </ul>
          </div>
        )
      }

      {selectedTrain && (
        <div>
          <h3 className='text-3xl my-3 font-semibold'>Seats for train: {trainData.find((train) => train.trainId === selectedTrain).name}</h3>

          <div className="grid grid-cols-3 gap-1 w-[200px] mt-2">
            {trainData.find((train) => train.trainId === selectedTrain)
              .seats.map((seat, index) => (
                <div
                  key={index}
                  className={`flex w-12 items-center justify-center text-white font-semibold text-xl cursor-pointer  ${seat.isBooked ? 'bg-red-400' : seat.isPWD ? 'bg-sky-300' : 'bg-green-400'}`}

                  onClick={() => !seat.isBooked && !seat.isPWD && handleSeatBooking(selectedTrain, index)}
                >
                  {seat.isBooked ? "x" : seat.isPWD ? 'pwd' : "o"}
                </div>
              ))
            }
          </div>
        </div >
      )}
    </>
  )
}

export default App