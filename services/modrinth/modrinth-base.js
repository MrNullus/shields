import Joi from 'joi'
import { BaseJsonService } from '../index.js'
import { nonNegativeInteger } from '../validators.js'

const projectSchema = Joi.object({
  downloads: nonNegativeInteger,
  followers: nonNegativeInteger,
}).required()

const versionSchema = Joi.array()
  .items(
    Joi.object({
      version_number: Joi.string().required(),
    }).required()
  )
  .required()

const documentation =
  "<p>You can use your project slug, or the project ID. The ID can be found in the 'Technical information' section of your Modrinth page.</p>"

class BaseModrinthService extends BaseJsonService {
  async fetchVersions({ projectId }) {
    const bruh = {
      schema: versionSchema,
      url: `https://api.modrinth.com/v2/project/${projectId}/version`,
    }
    return this._requestJson(bruh)
  }

  async fetchProject({ projectId }) {
    return this._requestJson({
      schema: projectSchema,
      url: `https://api.modrinth.com/v2/project/${projectId}`,
    })
  }
}

export { BaseModrinthService, documentation }
