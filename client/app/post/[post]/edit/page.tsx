"use client";
import { CheckIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import RidePostForm, {
  RidePostFormValues,
} from "../../../../components/ridePostForm";
import {
  useGetRidePostByIdQuery,
  useUpdateRidePostMutation,
} from "../../../../services/ridePostsApi";
import { mergeDateAndTimeToISO } from "../../../../utils/dateTime";

export default function EditPostPage({ params }: { params: { post: string } }) {
  const router = useRouter();
  const [updateRidePost] = useUpdateRidePostMutation();

  const { data: ridePost } = useGetRidePostByIdQuery(Number(params.post));

  if (!ridePost) return <div>Loading...</div>;

  const handleSubmit = async (values: RidePostFormValues) => {
    const departureDateTime = mergeDateAndTimeToISO(
      values.departureDate,
      values.departureTime
    );

    try {
      await updateRidePost({
        ...ridePost,
        ...values,
        departureDateTime,
      }).unwrap();

      notifications.show({
        message: "Объявление успешно обновлено",
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

  const dateTime = new Date(ridePost.departureDateTime ?? "");
  const initialData = {
    ...ridePost,
    departureDate: dateTime.toLocaleDateString(),
    departureTime: dateTime.toLocaleTimeString(),
  };

  return (
    <RidePostForm isEdited onSubmit={handleSubmit} initialData={initialData} />
  );
}
