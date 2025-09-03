"use client";
import { CheckIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import RidePostForm, {
  RidePostFormValues,
} from "../../components/ridePostForm";
import { useCreateRidePostMutation } from "../../services/ridePostsApi";
import { useGetRideRolesQuery } from "../../services/rideRolesApi";
import { RideRoleName } from "../../types/rideRole";
import { mergeDateAndTimeToISO } from "../../utils/dateTime";

export default function NewPage() {
  const router = useRouter();
  const [createRidePost] = useCreateRidePostMutation();

  const { data: { rideRoleNameToIdMap } = {} } = useGetRideRolesQuery();

  const handleSubmit = async (values: RidePostFormValues) => {
    const departureDateTime = mergeDateAndTimeToISO(
      values.departureDate,
      values.departureTime
    );

    try {
      const ridePost = await createRidePost({ ...values, departureDateTime }).unwrap();

      notifications.show({
        message: "Объявление успешно создано",
        color: "teal",
        title: "Успех!",
        position: "top-right",
        icon: <CheckIcon size={20} />,
      });
      router.push(`/post/${ridePost.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!rideRoleNameToIdMap) return null;

  const initialData = {
    rideRoleId: rideRoleNameToIdMap[RideRoleName.Driver],
    sourceId: undefined,
    destinationId: undefined,
    departureDate: new Date().toString(),
    departureTime: "",
    seats: undefined,
    pricePerSeat: undefined,
    pricePerCar: undefined,
    comment: "",
    anonName: "",
    anonPhone: "",
    anonCar: "",
  };

  return <RidePostForm onSubmit={handleSubmit} initialData={initialData} />;
}
