import { Typography } from '@material-tailwind/react';
import React from 'react';
import TranslatedText from '../../utils/Translation';
import Hassen from '../../assets/images/team/Employee.jpg';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import CustomTab from '../../components/Tab';
import ProfileCard from '../../components/Card/ProfileCard';
import COCEOPFP from '../../assets/images/team/Co-CEO.png';
import CEOPFP from '../../assets/images/team/CEO.png';

const Employees = () => {
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <React.Fragment>
      <div className="flex items-center justify-center  mt-4">
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4" />
        <Typography
          variant="h4"
          color="black"
          className={`m-4 font-extrabold ${
            LightModeState == LightMode().type
              ? 'TextWhiteMode'
              : 'TextDarkMode'
          }`}
        >
          <TranslatedText TranslationPath="Home.Team.Team_title" />
        </Typography>
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4" />
      </div>
      <CustomTab
        data={[
          {
            label: 'All',
            value: 'All',

            desc: (
              <div className="table-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                <div className="table-cell aspect-w-1 aspect-h-1 m-3 ">
                  <ProfileCard
                    name="Kamel Hachicha"
                    position="CEO"
                    image={CEOPFP}
                  />
                </div>
                <div className="table-cell aspect-w-1 aspect-h-1 m-3">
                  <ProfileCard
                    name="Melek Hachicha"
                    position="Co-Founder"
                    image={COCEOPFP}
                  />
                </div>
                <div className="table-cell aspect-w-1 aspect-h-1 m-3">
                  <ProfileCard
                    name="Hassen Jeribi"
                    position="Chef Service"
                    image={Hassen}
                  />
                </div>
                <div className="table-cell aspect-w-1 aspect-h-1 m-3">
                  <ProfileCard
                    name="Hassen Jeribi"
                    position="Chef Service"
                    image={Hassen}
                  />
                </div>
              </div>
            ),
          },
          {
            label: 'Management Team',
            value: 'Management Team',
            desc: (
              <div className="table-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                <div className="table-cell aspect-w-1 aspect-h-1 m-3 ">
                  <ProfileCard
                    name="Kamel Hachicha"
                    position="CEO"
                    image={CEOPFP}
                  />
                </div>
                <div className="table-cell aspect-w-1 aspect-h-1 m-3">
                  <ProfileCard
                    name="Melek Hachicha"
                    position="Co-Founder"
                    image={COCEOPFP}
                  />
                </div>
              </div>
            ),
          },
          {
            label: 'Staff Team',
            value: 'Staff Team',
            desc: (
              <div className="table-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                <div className="table-cell aspect-w-1 aspect-h-1 m-3">
                  <ProfileCard
                    name="Hassen Jeribi"
                    position="Chef Service"
                    image={Hassen}
                  />
                </div>
              </div>
            ),
          },
        ]}
        DefaultSelectValue={'All'}
      />
    </React.Fragment>
  );
};
export default Employees;
