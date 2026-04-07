export const fetchProfilesApi = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "John Doe",
          role: "Developer",
          followers: 120,
          liked: false,
          avatarSrc: "https://www.pngrepo.com/png/209349/180/user-avatar.png"
        },
        {
          id: 2,
          name: "Jane Smith",
          role: "Designer",
          followers: 80,
          liked: false,
          avatarSrc: "https://www.pngrepo.com/png/209349/180/user-avatar.png"
        },
        {
          id: 3,
          name: "Mike Johnson",
          role: "Manager",
          followers: 200,
          liked: false,
          avatarSrc: "https://www.pngrepo.com/png/209349/180/user-avatar.png"
        }
      ])
    }, 1000)
  })