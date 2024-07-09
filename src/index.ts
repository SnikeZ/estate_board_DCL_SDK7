// We define the empty imports so the auto-complete feature works as expected.
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import {
  engine,
  MeshRenderer,
  MeshCollider,
  Transform,
  TransformComponent,
  TransformType,
  Entity,
  Material,
  TextShape,
  Font,
  TextAlignMode,
  PointerEvents,
  pointerEventsSystem,
  InputAction,
  GltfContainer,
  TextureFilterMode,
  TextureWrapMode,
  MaterialTransparencyMode
} from '@dcl/sdk/ecs'
import { NFTSeverClient, LandOrder } from './marketplaceClient'
import { NFTSortBy, NFT, NFTCategory } from '@dcl/schemas'
import { openExternalUrl } from '~system/RestrictedActions'

const DATA: any[] = [
  {
    nft: {
      id: '0x959e104e1a4db6317fa58f8295f586e1a978c297-5717',
      tokenId: '5717',
      contractAddress: '0x959e104e1a4db6317fa58f8295f586e1a978c297',
      activeOrderId: '0x0a42157e40860ef377b8fa3dd240449efed64b013d808ef4a7f81b264f00b1bc',
      openRentalId: null,
      owner: '0xfa9aa3005f132ce8f91b3e1f84c01d84c375ce01',
      name: 'Pepe Dragon 🐉',
      image: 'https://api.decentraland.org/v1/estates/5717/map.png',
      url: '/contracts/0x959e104e1a4db6317fa58f8295f586e1a978c297/tokens/5717',
      data: {
        estate: {
          description: null,
          size: 60,
          parcels: [
            {
              x: 74,
              y: -127
            },
            {
              x: 74,
              y: -126
            },
            {
              x: 74,
              y: -125
            },
            {
              x: 74,
              y: -124
            },
            {
              x: 74,
              y: -123
            },
            {
              x: 75,
              y: -127
            },
            {
              x: 75,
              y: -126
            },
            {
              x: 75,
              y: -125
            },
            {
              x: 75,
              y: -124
            },
            {
              x: 75,
              y: -123
            },
            {
              x: 76,
              y: -127
            },
            {
              x: 76,
              y: -126
            },
            {
              x: 76,
              y: -125
            },
            {
              x: 76,
              y: -124
            },
            {
              x: 76,
              y: -123
            },
            {
              x: 77,
              y: -127
            },
            {
              x: 77,
              y: -126
            },
            {
              x: 77,
              y: -125
            },
            {
              x: 77,
              y: -124
            },
            {
              x: 77,
              y: -123
            },
            {
              x: 78,
              y: -127
            },
            {
              x: 78,
              y: -126
            },
            {
              x: 78,
              y: -125
            },
            {
              x: 78,
              y: -124
            },
            {
              x: 78,
              y: -123
            },
            {
              x: 79,
              y: -127
            },
            {
              x: 79,
              y: -126
            },
            {
              x: 79,
              y: -125
            },
            {
              x: 79,
              y: -124
            },
            {
              x: 79,
              y: -123
            },
            {
              x: 80,
              y: -127
            },
            {
              x: 80,
              y: -126
            },
            {
              x: 80,
              y: -125
            },
            {
              x: 80,
              y: -124
            },
            {
              x: 80,
              y: -123
            },
            {
              x: 81,
              y: -127
            },
            {
              x: 81,
              y: -126
            },
            {
              x: 81,
              y: -125
            },
            {
              x: 81,
              y: -124
            },
            {
              x: 81,
              y: -123
            },
            {
              x: 82,
              y: -127
            },
            {
              x: 82,
              y: -126
            },
            {
              x: 82,
              y: -125
            },
            {
              x: 82,
              y: -124
            },
            {
              x: 82,
              y: -123
            },
            {
              x: 83,
              y: -127
            },
            {
              x: 83,
              y: -126
            },
            {
              x: 83,
              y: -125
            },
            {
              x: 83,
              y: -124
            },
            {
              x: 83,
              y: -123
            },
            {
              x: 84,
              y: -127
            },
            {
              x: 84,
              y: -126
            },
            {
              x: 84,
              y: -125
            },
            {
              x: 84,
              y: -124
            },
            {
              x: 84,
              y: -123
            },
            {
              x: 85,
              y: -127
            },
            {
              x: 85,
              y: -126
            },
            {
              x: 85,
              y: -125
            },
            {
              x: 85,
              y: -124
            },
            {
              x: 85,
              y: -123
            }
          ]
        }
      },
      issuedId: null,
      itemId: null,
      category: 'estate',
      network: 'ETHEREUM',
      chainId: 1,
      createdAt: 1719897623000,
      updatedAt: 1719909551000,
      soldAt: 0
    },
    order: {
      id: '0x0a42157e40860ef377b8fa3dd240449efed64b013d808ef4a7f81b264f00b1bc',
      marketplaceAddress: '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539',
      contractAddress: '0x959e104e1a4db6317fa58f8295f586e1a978c297',
      tokenId: '5717',
      owner: '0xfa9aa3005f132ce8f91b3e1f84c01d84c375ce01',
      buyer: null,
      price: '1888000000000000000000000',
      status: 'open',
      network: 'ETHEREUM',
      chainId: 1,
      expiresAt: 1785517200,
      createdAt: 1719909551000,
      updatedAt: 1719909551000,
      issuedId: ''
    },
    rental: null
  }
]

const MARKETPLACE_URL = 'https://decentraland.org/marketplace'

export async function main() {

  const pos: TransformType = {
    position: Vector3.create(8, 1, 8),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  }

  // const nftServerClient = new NFTSeverClient()
  // nftServerClient
  //   .fetchNFTs({
  //     first: 3,
  //     sortBy: NFTSortBy.NEWEST,
  //     isLand: true,
  //     isOnSale: true,
  //   })
  //   .then((nfts) => {
  //     console.log("NFTS", nfts)
  //     const landBoard = new LandBoard(pos, nfts[0])
  //   })

  const landBoard = new LandBoard(pos, DATA[0])

}

main()

class LandBoard {
  private entity: Entity
  private data: any
  private position: TransformType

  // Text entity
  private nameTextEntity: Entity
  private priceTextEntity: Entity
  private chainTextEntity: Entity
  private landCountTextEntity: Entity

  private imageEntity: Entity
  constructor(pos: TransformType, data: any) {
    this.position = pos
    this.data = data

    this.entity = engine.addEntity()
    Transform.create(this.entity, pos)
    GltfContainer.create(this.entity, {
      src: 'models/obj_estates.gltf'
    })

    pointerEventsSystem.onPointerDown(
      {
        entity: this.entity,
        opts: { button: InputAction.IA_PRIMARY, hoverText: 'Click' }
      },
      () => {
        openExternalUrl({ url: MARKETPLACE_URL + this.data.nft.url })
      }
    )

    // Set texture
    this.imageEntity = engine.addEntity()
    Transform.create(this.imageEntity, {
      position: Vector3.create(0, 1.75, -0.06),
      scale: Vector3.create(2,2,2),
      parent: this.entity
    })
    MeshRenderer.setPlane(this.imageEntity)

    Material.createOrReplace(this.imageEntity, {
      material: {
        $case: 'pbr',
        pbr: {
          texture: {
            tex: {
              $case: 'texture',
              texture: { src: this.data.nft.image, filterMode: TextureFilterMode.TFM_TRILINEAR }
            }
          },
          emissiveColor: Color4.White(),
          emissiveIntensity: 0.9,
          emissiveTexture: {
            tex: {
              $case: 'texture',
              texture: { src: this.data.nft.image, filterMode: TextureFilterMode.TFM_TRILINEAR }
            }
          },
          roughness: 1.0,
          specularIntensity: 0,
          metallic: 0,
        }
      }
    })

    // Set plain text
    this.nameTextEntity = engine.addEntity()
    Transform.create(this.nameTextEntity, {
      position: Vector3.create(-0.85, 0.55, -0.06),
      parent: this.entity
    })
    TextShape.create(this.nameTextEntity, {
      text: validateName(this.data.nft.name),
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_BOTTOM_LEFT,
      textColor: Color4.White()
    })

    this.chainTextEntity = engine.addEntity()
    Transform.create(this.chainTextEntity, {
      position: Vector3.create(-0.85, 0.45, -0.06),
      parent: this.entity
    })
    TextShape.create(this.chainTextEntity, {
      text: this.data.nft.network,
      fontSize: 0.7,
      textAlign: TextAlignMode.TAM_BOTTOM_LEFT,
      textColor: Color4.Gray()
    })

    this.priceTextEntity = engine.addEntity()
    Transform.create(this.priceTextEntity, {
      position: Vector3.create(0.85, 0.55, -0.06),
      parent: this.entity
    })
    TextShape.create(this.priceTextEntity, {
      text: shortenNumber(this.data.order.price / 10 ** 18),
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_BOTTOM_RIGHT,
      textColor: Color4.White()
    })

    this.landCountTextEntity = engine.addEntity()
    Transform.create(this.landCountTextEntity, {
      position: Vector3.create(-0.85, 0.2, -0.06),
      parent: this.entity
    })
    TextShape.create(this.landCountTextEntity, {
      text: this.data.nft.data.estate.size + ' LAND',
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_BOTTOM_LEFT,
      textColor: Color4.White()
    })
  }

  public terminate() {
    engine.removeEntity(this.entity)
    engine.removeEntity(this.nameTextEntity)
    engine.removeEntity(this.priceTextEntity)
    engine.removeEntity(this.chainTextEntity)
    engine.removeEntity(this.landCountTextEntity)
    engine.removeEntity(this.imageEntity)
  }
}

function shortenNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

function validateName(name: string): string {
  // Capitalize first letter
  name = name.charAt(0).toUpperCase() + name.slice(1);
  // Delete all emojis
  name = name.replace(/[^\u0000-\u007F]/g, '');
  
  if (name.length > 14) {
    return name.substring(0, 14) + '...'
  }
  return name
}