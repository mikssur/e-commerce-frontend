import styled from '@emotion/styled'
import { Paper, IconButton } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import DeleteIcon from '@mui/icons-material/Delete'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { ImageUploadType } from './AddUpdateForm'

interface ImageSectionProps {
  imagesPreview: ImageUploadType | null
  handleRotate: () => void
  handleImageDelete: () => void
  handleUpload: (e: any) => void
}

export const ImageSection = ({
  imagesPreview,
  handleRotate,
  handleImageDelete,
  handleUpload
}: ImageSectionProps) => {
  return (
    <ImagesSection>
      {imagesPreview?.source ? (
        <ImageUploadContainer elevation={1}>
          <AutorenewImageIcon
            tabIndex={0}
            role="button"
            aria-label="Rotate image"
            onClick={() => handleRotate()}
          />
          <DeleteImageIcon
            tabIndex={0}
            role="button"
            aria-label="Delete image"
            onClick={() => handleImageDelete()}
          />
          <ImageWrapper onClick={() => handleRotate()}>
            <img
              width={240}
              height={240}
              src={imagesPreview?.source}
              alt="uploaded image"
              style={{ transform: `rotate(${imagesPreview.angle}deg)` }}
            />
          </ImageWrapper>
        </ImageUploadContainer>
      ) : (
        <ImageUploadContainer elevation={1}>
          <IconButton aria-label="upload picture" component="label">
            <input hidden type="file" accept="image/*" onChange={(e) => handleUpload(e)} />
            <AddImageIcon />
          </IconButton>
        </ImageUploadContainer>
      )}
    </ImagesSection>
  )
}

const ImagesSection = styled('div')({
  display: 'flex'
})

const ImageWrapper = styled('div')({
  width: 240
})

const ImageUploadContainer = styled(Paper)({
  height: 300,
  width: 240,
  backgroundColor: '#F1F1F1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
})

const AddImageIcon = styled(AddPhotoAlternateIcon)({
  color: '#C2C2C0',
  fontSize: 42,
  cursor: 'pointer',
  transition: 'all .3s',

  ':hover': {
    color: '#B8D7F0'
  }
})

const DeleteImageIcon = styled(DeleteIcon)({
  color: '#FF6078',
  fontSize: 18,
  cursor: 'pointer',
  transition: 'all .3s',
  position: 'absolute',
  zIndex: '1000',
  top: '1%',
  right: '2%',

  ':hover': {
    color: 'red'
  }
})

const AutorenewImageIcon = styled(AutorenewIcon)({
  color: '#ADB7BE',
  fontSize: 38,
  cursor: 'pointer',
  transition: 'all .3s',
  position: 'absolute',
  zIndex: '1000',
  top: 'auto',
  bottom: 'auto',
  left: 'auto',
  right: 'auto',
  opacity: '0.5',

  ':hover': {
    color: '#C7DAE9',
    opacity: '1'
  }
})
