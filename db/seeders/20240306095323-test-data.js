"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          clerkUid: "user_2cydzKQrGJehpHYBFprq5ewnHO3",
          email: "123@123.com",
          username: "abc123",
          firstName: "jean",
          lastName: "grey",
          about: "I have a RBF, but I promise I don't bite.",
          imageUrl:
            "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJkNlB0MUFWVVJsUGVSWHZ3Q3dVYXVSdEo2MiJ9",
          locationId: "5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          clerkUid: "user_2dBeb1NJGcIbszGPqXYx8ZQzpSk",
          email: "test1@test1.com",
          username: "kitty",
          firstName: "Kitty",
          lastName: "Tan",
          about: "I meow.",
          imageUrl:
            "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yY21FakZ1ZmJndmR4cENRNXZJY2dUem5OclgiLCJyaWQiOiJ1c2VyXzJkQmViMU5KR2NJYnN6R1BxWFl4OFpRenBTayIsImluaXRpYWxzIjoiS1QifQ",
          locationId: "5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          clerkUid: "user_2dDQHcg5wXu1rklKEY541HdNkCv",
          email: "test123@test.com",
          username: "helloworld",
          firstName: "Ice",
          lastName: "Queen",
          about: "The code never bothers me.",
          imageUrl:
            "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yY21FakZ1ZmJndmR4cENRNXZJY2dUem5OclgiLCJyaWQiOiJ1c2VyXzJkQmViMU5KR2NJYnN6R1BxWFl4OFpRenBTayIsImluaXRpYWxzIjoiS1QifQ",
          locationId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          clerkUid: "user_2dDSB43WRcZ6enhlk7ut98303US",
          email: "test2@test.com",
          username: "furbish",
          firstName: "Furb",
          lastName: "Bee",
          about: "Beepppp beep",
          imageUrl:
            "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yY21FakZ1ZmJndmR4cENRNXZJY2dUem5OclgiLCJyaWQiOiJ1c2VyXzJkQmViMU5KR2NJYnN6R1BxWFl4OFpRenBTayIsImluaXRpYWxzIjoiS1QifQ",
          locationId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          clerkUid: "user_2dIsMMTpNyRa74kfgVvB8co3Htf",
          email: "test3@test.com ",
          username: "little_pony",
          firstName: "Little",
          lastName: "Pony",
          about: "I am not your little pony. NEIGHH.",
          imageUrl:
            "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yY21FakZ1ZmJndmR4cENRNXZJY2dUem5OclgiLCJyaWQiOiJ1c2VyXzJkQmViMU5KR2NJYnN6R1BxWFl4OFpRenBTayIsImluaXRpYWxzIjoiS1QifQ",
          locationId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "activities",
      [
        {
          hostId: 1,
          title: "Take Photos with Mer-lee-leon",
          description:
            "Let's take a photo with the iconic Merlion at Singapore River. Learn some photography and video tricks. Meeting Point: Fullerton Hotel Lobby.",
          imageUrl:
            "https://mauoifsejtkdgffdnqya.supabase.co/storage/v1/object/public/activity/2020-12-23.jpg",
          cost: 40,
          locationId: 5,
          address: "1 Fullerton Square, Singapore 049178",
          latitude: "1.286228",
          longitude: "103.85305",
          eventDate: "2024-04-20 18:30:12.000 +0800",
          groupSizeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hostId: 2,
          title: "Get High at Night!!!",
          description:
            "Drink Drank Drunk, but go home yourself. Location: Viet Restaurant and Cloud Sky Bar",
          imageUrl:
            "https://mauoifsejtkdgffdnqya.supabase.co/storage/v1/object/public/activity/2023-02-05.jpg",
          cost: 100,
          locationId: 4,
          address:
            "of JM Marvel Hotel, 16 P. Hàng Da, Str, Hoàn Kiếm, Hà Nội 100000, Vietnam",
          latitude: "21.031113",
          longitude: "105.846634",
          eventDate: "2024-03-13 22:00:30.000 +0800",
          groupSizeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hostId: 3,
          title: "Dessert is your best friend",
          description: "Let's get diabetes together.",
          imageUrl: "",
          cost: 30,
          locationId: 1,
          address:
            "23A, Jln Telawi 3, Bangsar, 59100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
          latitude: "3.1319394",
          longitude: "101.67092",
          eventDate: "2024-03-21 11:00:30.000 +0800",
          groupSizeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          hostId: 3,
          title: "Muay Thai",
          description: "Vent out your anger on the trainer.",
          imageUrl: "",
          cost: 50,
          locationId: 4,
          address:
            "Số 59 Đ. Xuân Diệu, Quảng An, Tây Hồ, Hà Nội 124403, Vietnam",
          latitude: "21.065376",
          longitude: "105.827095",
          eventDate: "2024-03-19 08:00:30.000 +0800",
          groupSizeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hostId: 1,
          title: "Speed excursion in Singapore",
          description:
            "Aim to go to all tourist attractions in SG in 24 hours. Meeting Location: City Hall MRT",
          imageUrl:
            "https://mauoifsejtkdgffdnqya.supabase.co/storage/v1/object/public/activity/220830013209-02-jurong-bird-park-singapore-closure-intl-hnk.webp",
          cost: 150,
          locationId: 5,
          address: "150 North Bridge Rd, Singapore 179100",
          latitude: "1.2930838",
          longitude: "103.852036",
          eventDate: "2024-04-01 08:00:30.000 +0800",
          groupSizeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          hostId: 4,
          title: "Makan Trip",
          description: "We are going to have 8 meals in a day!!!! YUMS",
          imageUrl:
            "https://mauoifsejtkdgffdnqya.supabase.co/storage/v1/object/public/activity/20231116072724-c2-a9andy_cooks_thumbnails_nasi_lemak_01.webp",
          cost: 180,
          locationId: 1,
          address:
            "Pasar Transit Zone C, Jalan Raja Bot, Chow Kit, 50300 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
          latitude: "3.1652358",
          longitude: "101.69984",
          eventDate: "2024-03-23 11:00:30.000 +0800",
          groupSizeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hostId: 5,
          title: "Hiking",
          description:
            "Hike the Mount Kinabalu!!! 2D1N. Meeting Point: The peak.",
          imageUrl:
            "https://mauoifsejtkdgffdnqya.supabase.co/storage/v1/object/public/activity/Intrepid-Travel-borneo_mt-kinabalu_female-pax.jpg",
          cost: 100,
          locationId: 1,
          address: "Kinabalu Park,, 89308 Kundasang, Ranau, Sabah",
          latitude: "6.021255",
          longitude: "116.546295",
          eventDate: "2024-04-15 05:00:00.000 +0800",
          groupSizeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          hostId: 1,
          title: "Volunteering at Dog Shelter",
          description: "Play with the woof woof",
          imageUrl: "",
          cost: 0,
          locationId: 5,
          address: "59 Sungei Tengah Road",
          latitude: "1.3815047",
          longitude: "103.726",
          eventDate: "2024-03-05 18:30:12.000 +0800",
          groupSizeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          hostId: 5,
          title: "Tour around Halong Bay",
          description:
            "Looking for someone to share the cost to book a private boat.",
          imageUrl: "",
          cost: 22,
          locationId: 2,
          address: "Thành phố Hạ Long, Quảng Ninh, Vietnam",
          latitude: "21.030384",
          longitude: "105.8609",
          eventDate: "2024-03-20 18:30:12.000 +0800",
          groupSizeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          hostId: 3,
          title: "Yoga Retreat",
          description: "Yoga, then drink!",
          imageUrl:
            "https://mauoifsejtkdgffdnqya.supabase.co/storage/v1/object/public/activity/yoga.jpg",
          cost: 150,
          locationId: 2,
          address: "28, Thao Dien Street District 2, Ho Chi Minh City",
          latitude: "10.806201",
          longitude: "106.738014",
          eventDate: "2024-03-19 18:30:30.000 +0800",
          groupSizeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "activity_categories",
      [
        {
          activityId: 1,
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 1,
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 3,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 4,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 4,
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 5,
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 5,
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 6,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 7,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 7,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 8,
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 9,
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 10,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 10,
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "participants",
      [
        {
          activityId: 1,
          userId: 2,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 1,
          userId: 5,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 2,
          userId: 1,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 2,
          userId: 4,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 3,
          userId: 4,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 4,
          userId: 4,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 5,
          userId: 2,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 5,
          userId: 4,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 6,
          userId: 3,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 6,
          userId: 1,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 7,
          userId: 4,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 7,
          userId: 1,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          activityId: 10,
          userId: 1,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "followings",
      [
        {
          userId: 1,
          toFollowId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          toFollowId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          toFollowId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          toFollowId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          toFollowId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          toFollowId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          toFollowId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          toFollowId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          toFollowId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          toFollowId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          toFollowId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          toFollowId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          toFollowId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          toFollowId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          toFollowId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user", null, {});
    await queryInterface.dropTable("activities", null, {});
    await queryInterface.dropTable("activity_categories", null, {});
    await queryInterface.dropTable("participants", null, {});
    await queryInterface.dropTable("followings", null, {});
  },
};
