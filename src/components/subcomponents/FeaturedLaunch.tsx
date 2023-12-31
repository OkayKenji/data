import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonModal,
  IonRow,
} from "@ionic/react";
import "../Launch.css";
import LaunchInfo from "./modalcomponents/LaunchInfo";
import { useRef, useState } from "react";
import Countdown from "./Countdown";
import LaunchModal from "./LaunchModal";
import CustomImage from "./CustomImage";

export default function FeaturedLaunches(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setID] = useState(0);
  const { launch } = props;

  const modal = useRef<HTMLIonModalElement>(null);

  const openModal = () => {
    setID(launch.id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <IonGrid className="rows">
      <IonRow class="ion-align-items-center">
        <IonCol size="auto">
          <IonItem className="rows">
            <IonCard className="clickable"
              onClick={() => {
                openModal();
              }}
            >
              <CustomImage
                className={"specialImage"}
                image_url={launch.image}
              />
              {/* <img
                className="specialImage"
                alt="Img missing "
                src={}
              /> */}
              <IonCardHeader>
                <IonCardTitle>
                  {launch.mission
                    ? launch.mission.name
                    : launch.name.substring(launch.name.indexOf("|") + 1)}
                </IonCardTitle>
              </IonCardHeader>
              <LaunchInfo launch={launch}></LaunchInfo>
              <IonItem>Click this tab for more info!</IonItem>
            </IonCard>

            <IonModal isOpen={isOpen && launch.id == id} ref={modal} initialBreakpoint={1} breakpoints={[0, 1]} onDidDismiss={() => setIsOpen(false)}>
              <LaunchModal
                launch={launch}
                closeModal={closeModal}
              ></LaunchModal>
            </IonModal>
          </IonItem>
        </IonCol>

        <IonCol>
          <Countdown launchDate={launch.net} inline={false}></Countdown>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
