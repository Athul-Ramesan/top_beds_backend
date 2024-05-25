import { IDependencies } from "../application/interfaces/IDependencies";
import * as repositories from "../infrastructure/dataBase/repositories"
import *  as useCases from '@/application/useCases'

export const dependencies:IDependencies = {
    repositories,
    useCases
}