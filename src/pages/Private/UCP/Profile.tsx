import { Card, Typography, Input, Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from 'redux/actions/light-actions';
import Footer from 'components/footer';
import SideBar from 'components/SideBar';
import React from 'react';
import TopBar from 'components/Topbar';
import Topbarbg from 'assets/images/Topbarbg.webp';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
import { useNotify } from 'utils/hooks/useNotify';
export default function UCP_Profile() {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [imageSrc, setImageSrc] = React.useState('');
  const { t } = useTranslation();
  const { displayNotification, displayPromiseNotification } = useNotify();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  const HandleProfilEdit = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      displayPromiseNotification(promise, [], []);
    } catch (e) {
      /*Catch logic here */
    }
  };
  return (
    <>
      <div className="flex flex-row items-stretch">
        <aside className={`background-secondary mb-2 rounded-b-xl p-4 shadow-lg hidden xl:block w-[20vw]`}>
          <SideBar />
        </aside>

        <main className="w-full min-h-screen flex flex-col justify-start items-center ">
          <section
            className=" flex flex-col justify-center items-stretch w-full text-center h-[17vh] p-4 shadow-xl shadow-blue-gray-900/ bg-cover"
            style={{ backgroundImage: `url(${Topbarbg})` }}
          >
            <TopBar SectionName={t('UCP.TopNav.TabTitles.Profil')} Icon='<i className="fa-solid fa-user-gear"></i>' />
          </section>

          <section className="w-full flex justify-center  text-center">
            <Card
              className={`background-secondary p-2 w-full  min-h-[82vh] m-2 grid grid-cols-1 gap-3 `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className=" flex flex-col justify-center items-center col-span-1">
                <img
                  loading="lazy"
                  className="h-[30vh] w-[30vh] rounded-full object-cover object-center mb-4 "
                  src={imageSrc === '' ? 'https://via.placeholder.com/300x200.png?text=Placeholder+Image' : imageSrc}
                  alt="nature image"
                />
                <Input
                  labelProps={{
                    style: {
                      color: LightModeState === LightMode().type ? 'black' : 'white',
                    },
                  }}
                  label={t('UCP.Profil.TabInputs.ProfilImage')}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  icon={<i className="fa-solid fa-image"></i>}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <div className="col-span-1 flex flex-col justify-center items-center gap-2">
                <Input
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={t('UCP.Profil.TabInputs.FName')}
                  icon={<i className="fa-solid fa-circle-info"></i>}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <Input
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={t('UCP.Profil.TabInputs.LName')}
                  icon={<i className="fa-solid fa-circle-info"></i>}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <Input
                  labelProps={{
                    style: {
                      color: LightModeState === LightMode().type ? 'black' : 'white',
                    },
                  }}
                  label={t('UCP.Profil.TabInputs.NewPassword')}
                  icon={<i className="fa-solid fa-key"></i>}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <Input
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={t('UCP.Profil.TabInputs.VerifyPassword')}
                  icon={<i className="fa-solid fa-lock"></i>}
                  required
                  type="password"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <Typography
                  variant="small"
                  className="mt-2 flex items-center gap-1 font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4 inline"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t('UCP.Profil.TabHeader.PasswordInfo')}
                </Typography>
                <Button
                  onClick={HandleProfilEdit}
                  className="flex items-center gap-3 mt-4"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  {t('UCP.Profil.TabActions.SaveInformation')}
                </Button>
              </div>
            </Card>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
