import { useState } from 'react';
import Icon from '../../assets/Icon.png';

const NewCard = () => {
  const [profilePic, setProfilePic] = useState(Icon);

  const handleInput = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 w-[40%] items-center mb-5 mt-20">
        <p>Create a new card</p>
        <div className="h-[220px] flex flex-col justify-center items-center w-full bg-[#FAFAFA] rounded-2xl border-dashed border-[#FAFAFA] border-2">
          <img
            src={profilePic}
            className={`${
              profilePic !== Icon ? 'h-[150px] w-[150px]' : 'h-[36px] w-[36px]'
            }`}
            id="profile-pic"
            alt="Profile"
          />
          <label htmlFor="input-file" className="cursor-pointer mt-2">Select image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="input-file"
            className="hidden"
            onChange={handleInput}
          />
        </div>
        <div className="flex justify-between w-full gap-3">
          <div>
            <h1 className="mb-3">Word in English</h1>
            <input type="text" placeholder="Write here..." className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" />
          </div>
          <div>
            <h1 className="mb-3">Word in Spanish</h1>
            <input type="text" placeholder="Write here..." className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" />
          </div>
        </div>
        <div className="flex justify-between w-full gap-3">
          <div>
            <h1 className="mb-3">Record voice in English</h1>
            <input type="text" placeholder="Write here" className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" />
          </div>
          <div>
            <h1 className="mb-3">Record voice in Spanish</h1>
            <input type="text" placeholder="Write here" className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" />
          </div>
        </div>
        <button className="bg-[#4CAF50] w-full p-2 rounded-xl text-white">Create card</button>
      </div>
    </div>
  );
};

export default NewCard;
