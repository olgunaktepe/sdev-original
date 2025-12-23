// images
const avatar1 = 'assets/images/users/avatar-1.jpg'
const avatar2 = 'assets/images/users/avatar-2.jpg'
const avatar3 = 'assets/images/users/avatar-3.jpg'
const avatar4 = 'assets/images/users/avatar-4.jpg'
const avatar5 = 'assets/images/users/avatar-5.jpg'
const avatar6 = 'assets/images/users/avatar-6.jpg'
const avatar7 = 'assets/images/users/avatar-7.jpg'
const avatar8 = 'assets/images/users/avatar-8.jpg'
const avatar9 = 'assets/images/users/avatar-9.jpg'
const avatar10 = 'assets/images/users/avatar-10.jpg'

const img1 = 'assets/images/file-icons/pdf.svg'
const img2 = 'assets/images/file-icons/png.svg'
const img3 = 'assets/images/file-icons/psd.svg'
const img4 = 'assets/images/file-icons/avi.svg'
const img5 = 'assets/images/file-icons/pdf.svg'
const img6 = 'assets/images/file-icons/txt.svg'
const img7 = 'assets/images/file-icons/eps.svg'
const img8 = 'assets/images/file-icons/dll.svg'
const img9 = 'assets/images/file-icons/sql.svg'
const img10 = 'assets/images/file-icons/zip.svg'

interface FileTypes {
  file_name: string
  file_icon: string
  modified_date: string
  size: string
  contributors: string[]
}

const files: FileTypes[] = [
  {
    file_name: 'Invoice-project.pdf',
    file_icon: img1,
    modified_date: '17-Jan-18 2:55 PM',
    size: '2.31 MB',
    contributors: [avatar4, avatar6],
  },
  {
    file_name: 'Dashboard-design.png',
    file_icon: img2,
    modified_date: '21-May-18 1:12 PM',
    size: '3.89 MB',
    contributors: [avatar5],
  },
  {
    file_name: 'Graphic-logo-main.psd',
    file_icon: img3,
    modified_date: '23-May-18 11:34 AM',
    size: '125 MB',
    contributors: [avatar1, avatar2, avatar3],
  },
  {
    file_name: 'Audio-video-file.avi',
    file_icon: img4,
    modified_date: '18-Feb-18 4:29 PM',
    size: '12.3 MB',
    contributors: [avatar7, avatar8],
  },
  {
    file_name: 'Holiday-trip-expenses.pdf',
    file_icon: img5,
    modified_date: '10-Apr-18 1:12 PM',
    size: '256 KB',
    contributors: [avatar6],
  },
  {
    file_name: 'File-changes-notes.txt',
    file_icon: img6,
    modified_date: '17-Jan-18 2:55 PM',
    size: '57.3 MB',
    contributors: [avatar9, avatar10],
  },
  {
    file_name: 'Eps-file-formate.eps',
    file_icon: img7,
    modified_date: '21-Jun-18 1:12 PM',
    size: '429 MB',
    contributors: [avatar1, avatar2],
  },
  {
    file_name: 'Software-activation.dll',
    file_icon: img8,
    modified_date: '23-May-18 11:34 AM',
    size: '58 KB',
    contributors: [avatar3],
  },
  {
    file_name: 'Database-db.sql',
    file_icon: img9,
    modified_date: '18-July-18 4:29 PM',
    size: '89.3 MB',
    contributors: [avatar9, avatar10],
  },
  {
    file_name: 'Minton-latest.zip',
    file_icon: img10,
    modified_date: '10-Aug-18 1:12 PM',
    size: '248 MB',
    contributors: [avatar4],
  },
]

export { files }
